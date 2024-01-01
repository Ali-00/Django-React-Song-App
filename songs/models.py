from django.db import models
from albums.models import Album


# Create your models here.
# songs model
class Song(models.Model):
    id_songs = models.CharField(max_length=300, primary_key=True, unique=True)
    name_song = models.CharField(max_length=300)
    album_id = models.ForeignKey(Album, on_delete=models.CASCADE)
    danceability = models.FloatField()
    duration_ms = models.BigIntegerField()
    release_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name_song


# update at and create at in django models
