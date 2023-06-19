from rest_framework import mixins, viewsets

from api.v1.paginator import RoomsPagination
from apps.chat.models import Room, Message
from apps.chat.serializers import RoomSerializer, RoomDetailSerializer, MessageSerializer


class RoomViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    viewsets.GenericViewSet
):
    """Вьюсет комнат"""
    serializer_class = RoomSerializer
    queryset = Room.objects.all()
    pagination_class = RoomsPagination
    serializer_classes = {
        "retrieve": RoomDetailSerializer,
    }
    default_serializer_class = RoomSerializer

    def get_serializer_class(self):
        return self.serializer_classes.get(
            self.action, self.default_serializer_class
        )


class MessageViewSet(mixins.ListModelMixin,viewsets.GenericViewSet):
    """Вьюсет сообщений"""
    serializer_class = MessageSerializer
    queryset = Message.objects.all()
    pagination_class = RoomsPagination

    def filter_queryset(self, queryset):
        return queryset.filter(room_id=self.kwargs["pk"]).order_by("-created_at")

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        response.data["user"] = request.user.id
        room = Room.objects.get(pk=self.kwargs["pk"])
        response.data["room_name"] = room.name
        response.data["count_members"] = room.current_users.count()
        return response
