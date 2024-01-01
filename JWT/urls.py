from . import views
from django.urls import path
from .views import MyTokenObtainPairView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
app_name = "core"

urlpatterns = [
    path("", views.Routes),
    path("token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    # path("login_redirect/", views.social_login_redirect, name="login_redirect"),
]
