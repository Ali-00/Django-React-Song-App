from django.contrib import admin
from django.urls import path
from songs import views

urlpatterns = [
    path("", views.Routes_song),
    path("song1", views.Routes_song1),
    path("showsong/", views.showsong),
]
