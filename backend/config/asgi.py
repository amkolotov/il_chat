import os

from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from channels_auth_token_middlewares.middleware import QueryStringSimpleJWTAuthTokenMiddleware
from django.core.asgi import get_asgi_application

from apps.chat import routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')


application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),
        "websocket": AllowedHostsOriginValidator(
            QueryStringSimpleJWTAuthTokenMiddleware(
                URLRouter(routing.ws_urlpatterns),
            ),
        ),
    }
)
