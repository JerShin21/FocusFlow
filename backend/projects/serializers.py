from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Project
from users.serializers import UserSerializer

class ProjectSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    progress = serializers.SerializerMethodField()
    class Meta:
        model = Project
        fields = ["id", "name", "description", "created_by", "created_at", "updated_at", "last_accessed", "progress"]
        extra_kwargs = {"created_at": {"read_only": True}, "created_by": {"read_only": True}}

    def get_progress(self, obj):
        return obj.calculate_progress()

    def create(self, validated_data):
        request = self.context.get('request', None)
        if request and request.user.is_authenticated:
            validated_data['created_by'] = request.user
        return super().create(validated_data)