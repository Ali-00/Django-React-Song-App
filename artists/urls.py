from django.contrib import admin
from django.urls import path, include
from artists import views

urlpatterns = [
    # path('Uploadartists/', views.Upload_artists),
    path("showartist/", views.showallartist),
    path("", views.Routes_artist),
]
