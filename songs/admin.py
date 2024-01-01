from django.contrib import admin
from .models import Song
from artists.models import Artist
from albums.models import Album

# Register your models here.
admin.site.register(Song)
admin.site.register(Artist)
admin.site.register(Album)
