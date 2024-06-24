from django.shortcuts import render
from django.contrib.auth.models import User
from django.utils import timezone
from .models import Task
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .serializers import TaskSerializer

# Create your views here.
class TaskListCreate(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(created_by=self.request.user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class TaskRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(created_by=self.request.user)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.last_accessed = timezone.now()
        instance.save(update_fields=['last_accessed'])
        return super().retrieve(request, *args, **kwargs)

    def perform_update(self, serializer):
        instance = serializer.save()
        instance.updated_at = timezone.now()
        instance.save(update_fields=['updated_at'])

    def perform_destroy(self, instance):
        instance.delete()

class RecentTasksList(generics.ListAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(created_by=self.request.user).order_by('-last_accessed','-updated_at', '-created_at')[:5]