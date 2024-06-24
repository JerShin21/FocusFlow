from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Project(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, null=False)
    description = models.TextField(blank=True, null=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(null=True, blank=True)
    last_accessed = models.DateTimeField(null=True, blank=True)

    def calculate_progress(self):
        total_tasks = self.tasks.count()
        completed_tasks = self.tasks.filter(status='Completed').count()
        if total_tasks > 0:
            progress = (completed_tasks / total_tasks) * 100
        else:
            progress = 100
        return progress

    def __str__(self):
        return self.name
