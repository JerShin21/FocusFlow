from django.urls import path
from . import views

urlpatterns = [
    path('projects/', views.ProjectListCreate.as_view(), name='project_list_create'),
    path('projects/<int:pk>/', views.ProjectRetrieveUpdateDestroy.as_view(), name='project_retrieve_update_destroy'),
]