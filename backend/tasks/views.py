from django.shortcuts import render
from django.contrib.auth.models import User
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
        if (serializer.is_valid()):
            serializer.save(created_by=self.request.user)
        else:
            print(serializer.errors)

class TaskRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(created_by=self.request.user)
    
    def perform_update(self, serializer):
        if (serializer.is_valid()):
            serializer.save(created_by=self.request.user)
        else:
            print(serializer.errors)

    def perform_destroy(self, instance):
        instance.delete()