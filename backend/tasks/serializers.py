from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Task
from users.serializers import UserSerializer
from projects.serializers import ProjectSerializer
from projects.models import Project

class ProjectField(serializers.Field):
    def to_representation(self, value):
        # Use ProjectSerializer to serialize the project instance
        return ProjectSerializer(value).data

    def to_internal_value(self, data):
        # Use PrimaryKeyRelatedField to handle the deserialization
        try:
            project = Project.objects.get(pk=data)
            return project
        except Project.DoesNotExist:
            raise serializers.ValidationError("Invalid project ID")

class TaskSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    project = ProjectField()

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
