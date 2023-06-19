from django.urls import path

from apps.chat import consumers

ws_urlpatterns = [
    path("ws/chat/", consumers.RoomConsumer.as_asgi()),
]
