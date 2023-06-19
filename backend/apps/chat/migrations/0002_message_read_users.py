# Generated by Django 4.2.2 on 2023-06-18 12:51

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('chat', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='read_users',
            field=models.ManyToManyField(related_name='user_read_messages', to=settings.AUTH_USER_MODEL, verbose_name='Прочитано пользователями'),
        ),
    ]