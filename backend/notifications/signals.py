from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Notification
from projects.models import Project
from tasks.models import Task
from django.contrib.auth.models import User

@receiver(post_save, sender=Project)
def project_created(sender, instance, created, **kwargs):
    if created:
        Notification.objects.create(user=instance.created_by, message=f"Project {instance.name} created")
    else:
        Notification.objects.create(user=instance.created_by, message=f"Project {instance.name} updated")

@receiver(post_delete, sender=Project)
def project_deleted(sender, instance, **kwargs):
    Notification.objects.create(user=instance.created_by, message=f"Project {instance.name} deleted")

@receiver(post_save, sender=Task)
def task_created(sender, instance, created, **kwargs):
    if created:
        Notification.objects.create(user=instance.project.created_by, message=f"Task {instance.title} created")
    else:
        Notification.objects.create(user=instance.project.created_by, message=f"Task {instance.title} updated")

@receiver(post_delete, sender=Task)
def task_deleted(sender, instance, **kwargs):
    Notification.objects.create(user=instance.project.created_by, message=f"Task {instance.title} deleted")