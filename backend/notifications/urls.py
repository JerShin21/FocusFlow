from django.urls import path
from . import views

urlpatterns = [
    path('notifications/', views.NotificationViewSet.as_view({'get': 'list', 'post': 'create'}), name='notification_list_create'),
    path('notifications/<int:pk>/mark_as_read/', views.NotificationViewSet.as_view({'post': 'mark_as_read'}), name='notification_mark_as_read'),
    path('notifications/mark_all_as_read/', views.NotificationViewSet.as_view({'post': 'mark_all_as_read'}), name='notification_mark_all_as_read'),
]
