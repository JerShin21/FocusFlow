from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Task
from users.serializers import UserSerializer

class TaskSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)

    class Meta:
        model = Task
        fields = ["id", "title", "description", "due_date", "priority", "status", "project", "created_by", "created_at", "updated_at", "last_accessed"]
        extra_kwargs = {
            "created_at": {"read_only": True},
            "created_by": {"read_only": True}
        }

    def create(self, validated_data):
        request = self.context.get('request', None)
        if request and request.user.is_authenticated:
            validated_data['created_by'] = request.user
        return super().create(validated_data)
