from django.urls import path
from . import views

urlpatterns = [
    path('tasks/', views.TaskListCreate.as_view(), name='task_list_create'),
    path('tasks/<int:pk>/', views.TaskRetrieveUpdateDestroy.as_view(), name='task_retrieve_update_destroy'),
    path('recent-tasks/', views.RecentTasksList.as_view(), name='recent_tasks_list'),
    path('task-choices/', views.get_task_choices, name='task_choices'),
]