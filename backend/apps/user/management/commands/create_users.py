from decouple import config
from django.contrib.auth import get_user_model
from django.core.management import BaseCommand

User = get_user_model()


class Command(BaseCommand):
    """Команда Django для создания суперпользователя"""

    def handle(self, *args, **options):
        if not User.objects.exists():
            User.objects.create_user(username='Ваня', email='ivan@mail.ru', password='uGSivZC0')
            User.objects.create_user(username='Петя', email='petr@mail.ru', password='qPJrTYct')
