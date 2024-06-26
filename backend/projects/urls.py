from django.urls import path
from . import views

urlpatterns = [
    path('projects/', views.ProjectListCreate.as_view(), name='project_list_create'),
    path('projects/<int:pk>/', views.ProjectRetrieveUpdateDestroy.as_view(), name='project_retrieve_update_destroy'),
    path('recent-projects/', views.RecentProjectsList.as_view(), name='recent_projects_list'),
    path('project-choices/', views.get_project_choices, name='project_choices'),
]