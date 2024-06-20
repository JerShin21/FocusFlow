from rest_framework import serializers
from notifications.models import Notification
from django.contrib.auth.models import User
from users.serializers import UserSerializer

class NotificationSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Notification
        fields = ["id", "user", "message", "read", "created_at"]
        read_only_fields = ["id","user", "created_at"]