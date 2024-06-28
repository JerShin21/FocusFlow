from django.shortcuts import render
from django.contrib.auth.models import User
from django.utils import timezone
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from .models import Project
from .serializers import ProjectSerializer
from tasks.views import NoPagination 

# Create your views here.
class ProjectListCreate(generics.ListCreateAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = NoPagination  # Disable pagination for this view

    def get_queryset(self):
        return Project.objects.filter(created_by=self.request.user.id)

    def perform_create(self, serializer):
        if (serializer.is_valid()):
            serializer.save(created_by=self.request.user)
        else:
            print(serializer.errors)

class ProjectRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.last_accessed = timezone.now()
        instance.save(update_fields=['last_accessed'])
        return super().retrieve(request, *args, **kwargs)

    def get_queryset(self):
        return Project.objects.filter(created_by=self.request.user)
    
    def perform_update(self, serializer):
        instance = serializer.save()
        instance.updated_at = timezone.now()
        instance.save(update_fields=['updated_at'])

    def perform_destroy(self, instance):
        instance.delete()

class RecentProjectsList(generics.ListAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = NoPagination  # Disable pagination for this view

    def get_queryset(self):
        return Project.objects.filter(created_by=self.request.user).order_by('-last_accessed', '-updated_at', '-created_at')[:5]
    
@api_view(['GET'])
def get_project_choices(request):
    return Response({
        'project_choices': [{'value': project.id, 'label': project.name} for project in Project.objects.filter(created_by=request.user.id)]
    })
