from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

from api.v1.views import RoomViewSet, MessageViewSet

urlpatterns = [
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("room/", RoomViewSet.as_view({'get': 'list', 'post': 'create'})),
    path("room/<pk>/messages", MessageViewSet.as_view({'get': 'list'}))
]
