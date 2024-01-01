from django.db import models
from artists.models import Artist


# album model
class Album(models.Model):
    album = models.CharField(max_length=200)
    album_id = models.CharField(max_length=200, primary_key=True, unique=True)
    artist_ids = models.ForeignKey(Artist, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.album
