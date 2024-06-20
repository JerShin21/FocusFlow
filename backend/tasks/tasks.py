from celery import shared_task
from django.utils import timezone
from datetime import timedelta
from .models import Task
from notifications.models import Notification

@shared_task
def check_due_dates():
    now = timezone.now()
    upcoming_tasks = Task.objects.filter(due_date__gt=now, due_date__lt=now + timedelta(days=1), status='Pending')
    for task in upcoming_tasks:
        Notification.objects.create(
            user=task.created_by,
            message=f'The task "{task.title}" is due soon!'
        )
