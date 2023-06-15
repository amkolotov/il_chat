from django.contrib.auth import get_user_model
from django.db import models


User = get_user_model()


class Room(models.Model):
    """Модель комнаты"""

    name = models.CharField(
        'Комната', max_length=256, null=False, blank=False, unique=True
    )
    host = models.ForeignKey(
        User, on_delete=models.CASCADE,
        related_name='user_rooms', verbose_name='Хост'
    )
    current_users = models.ManyToManyField(
        User, related_name='user_current_rooms', blank=True,
        verbose_name='Текущие пользователи'
    )

    def __str__(self):
        return f'Комната({self.name} - {self.host})'


class Message(models.Model):
    """Модель сообщения"""

    room = models.ForeignKey(
        Room, on_delete=models.CASCADE,
        related_name='room_messages', verbose_name='Комната'
    )
    text = models.TextField('Сообщение', max_length=512)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE,
        related_name='user_messages', verbose_name='Пользователь'
    )
    created_at = models.DateTimeField('Дата создания', auto_now_add=True)

    def __str__(self):
        return f'Сообщение({self.user} {self.room})'
