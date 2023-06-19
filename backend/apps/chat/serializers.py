from django.contrib.auth import get_user_model

from rest_framework import serializers

from apps.chat.models import Message, Room

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """Сериализатор пользователя"""
    class Meta:
        model = User
        fields = ["id", "username"]


class MessageSerializer(serializers.ModelSerializer):
    """Сериализатор сообщения"""
    user = UserSerializer()
    read_count = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = ["id", "text", "user", "created_at", "read_count"]

    def get_read_count(self, obj: Message):
        return obj.read_users.count()


class RoomDetailSerializer(serializers.ModelSerializer):
    """Сериализатор комнаты"""
    room_messages = MessageSerializer(many=True)

    class Meta:
        model = Room
        fields = ["id", "name", "room_messages", "current_users"]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['user'] = self.context["request"].user.id
        return data


class RoomSerializer(serializers.ModelSerializer):
    """Сериализатор комнат"""
    messages = MessageSerializer(many=True, read_only=True)

    class Meta:
        model = Room
        fields = ["id", "name", "host", "messages", "current_users"]
        read_only_fields = ["id", "messages", "host", "current_users"]

    def create(self, validated_data):
        validated_data["host"] = self.context["request"].user
        return super().create(validated_data)




