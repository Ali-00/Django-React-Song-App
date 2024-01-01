from django.db import models


# Create your models here.
# Artist model
class Artist(models.Model):
    artists = models.CharField(max_length=200)
    artist_ids = models.CharField(max_length=200, primary_key=True, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.artists
