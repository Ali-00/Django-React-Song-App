from django.contrib import admin
from django.urls import path, include
from albums import views

urlpatterns = [
    path("", views.Routes_album),
    path("showalbums/", views.showalbums),
    path("albums", views.show_album),
]
