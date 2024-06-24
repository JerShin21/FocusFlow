from django.db.models.signals import post_save
from django.dispatch import receiver
from projects.models import Project
from django.contrib.auth.models import User

@receiver(post_save, sender=User)
def create_project(sender, instance, created, **kwargs):
    if created:
        Project.objects.create(name="General", created_by=instance)