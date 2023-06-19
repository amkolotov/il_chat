import json

from channels.db import database_sync_to_async
from djangochannelsrestframework.generics import GenericAsyncAPIConsumer
from djangochannelsrestframework.observer.generics import \
    ObserverModelInstanceMixin, action
from djangochannelsrestframework.observer import model_observer

from .models import Room, Message
from django.contrib.auth.models import User
from .serializers import MessageSerializer, RoomSerializer, UserSerializer


class RoomConsumer(ObserverModelInstanceMixin, GenericAsyncAPIConsumer):
    """Консьюмер чата"""

    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    lookup_field = "pk"

    async def connect(self) -> None:
        await super().connect()

    async def disconnect(self, code):
        if hasattr(self, "room_subscribe"):
            await self.remove_user_from_room(self.room_subscribe)
            await self.notify_users()
        await super().disconnect(code)

    @action()
    async def join_room(self, pk: int, **kwargs):
        self.room_subscribe = pk
        await self.add_user_to_room(pk)
        await self.notify_users()

    @action()
    async def leave_room(self, pk: int, **kwargs):
        await self.remove_user_from_room(pk)

    @action()
    async def create_message(self, message: str, **kwargs):
        room: Room = await self.get_room(pk=self.room_subscribe)
        await database_sync_to_async(Message.objects.create)(
            room=room,
            user=self.scope["user"],
            text=message
        )

    @action()
    async def read(self, pk_list: list[int], **kwargs):
        await self.read_messages(pk_list)

    @action()
    async def subscribe_to_messages_in_room(self, pk: int, **kwargs):
        await self.message_activity.subscribe(room=pk)

    @model_observer(Message)
    async def message_activity(self, message: str, observer=None, **kwargs):
        await self.send_json(message)

    @message_activity.groups_for_signal
    def message_activity(self, instance: Message, **kwargs):
        yield f"room__{instance.room_id}"
        yield f"pk__{instance.pk}"

    @message_activity.groups_for_consumer
    def message_activity(self, room=None, **kwargs):
        if room is not None:
            yield f"room__{room}"

    @message_activity.serializer
    def message_activity(self, instance: Message, action, **kwargs):
        return dict(
            data=MessageSerializer(instance).data,
            action=action.value,
            pk=instance.pk
        )

    async def notify_users(self):
        room: Room = await self.get_room(self.room_subscribe)
        for group in self.groups:
            await self.channel_layer.group_send(
                group,
                {
                    "type": "update_users",
                    "usuarios": await self.current_users(room)
                }
            )

    async def update_users(self, event: dict):
        await self.send(text_data=json.dumps({"usuarios": event["usuarios"]}))

    @database_sync_to_async
    def get_room(self, pk: int) -> Room:
        return Room.objects.get(pk=pk)

    @database_sync_to_async
    def current_users(self, room: Room):
        return [UserSerializer(user).data for user in room.current_users.all()]

    @database_sync_to_async
    def remove_user_from_room(self, room: Room):
        user: User = self.scope["user"]
        user.user_current_rooms.remove(room)

    @database_sync_to_async
    def add_user_to_room(self, pk: int):
        user: User = self.scope["user"]
        if not user.user_current_rooms.filter(pk=self.room_subscribe).exists():
            user.user_current_rooms.add(Room.objects.get(pk=pk))

    @database_sync_to_async
    def read_messages(self, pk_list: list[int]):
        for pk in pk_list:
            message = Message.objects.get(pk=pk)
            if message and not \
                    message.read_users.filter(id=self.scope["user"].id).exists():
                message.read_users.add(self.scope["user"])
                message.save()
