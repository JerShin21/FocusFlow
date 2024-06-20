from django.shortcuts import render
from django.contrib.auth.models import User
from .models import Project
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .serializers import ProjectSerializer

# Create your views here.
class ProjectListCreate(generics.ListCreateAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Project.get_queryset().filter(created_by=self.request.user)

    def perform_create(self, serializer):
        if (serializer.is_valid()):
            serializer.save(created_by=self.request.user)
        else:
            print(serializer.errors)

class ProjectRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Project.get_queryset().filter(created_by=self.request.user)
    
    def perform_update(self, serializer):
        if (serializer.is_valid()):
            serializer.save(created_by=self.request.user)
        else:
            print(serializer.errors)

    def perform_destroy(self, instance):
        instance.delete()
