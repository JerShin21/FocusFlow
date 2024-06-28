from django.shortcuts import render
from django.contrib.auth.models import User
from django.utils import timezone
from .models import Task
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TaskSerializer
from rest_framework import status
from rest_framework.pagination import PageNumberPagination, LimitOffsetPagination

# Create your views here.
class NoPagination(PageNumberPagination):
    page_size = None

class TaskListCreate(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = NoPagination

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

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        if 'status' in request.data:
            instance.status = request.data['status']
            instance.updated_at = timezone.now()
            instance.save(update_fields=['status', 'updated_at'])
            return Response(TaskSerializer(instance).data, status=status.HTTP_200_OK)
        return super().partial_update(request, *args, **kwargs)

class RecentTasksList(generics.ListAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = NoPagination

    def get_queryset(self):
        return Task.objects.filter(created_by=self.request.user).order_by('-last_accessed','-updated_at', '-created_at')[:5]
    
@api_view(['GET'])
def get_task_choices(request):
    priority_choices = [{'value': choice[0], 'label': choice[1]} for choice in Task.PRIORITY_CHOICES]
    status_choices = [{'value': choice[0], 'label': choice[1]} for choice in Task.STATUS_CHOICES]
    return Response({
        'priority_choices': priority_choices,
        'status_choices': status_choices,
    })