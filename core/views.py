from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


def index(request):
    return render(request, "index.html")

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token)
    }

@login_required
def social_login_redirect(request):
    try:
        user = User.objects.get(username=request.user.username)
        tokens = get_tokens_for_user(user).get("access")
        # res = redirect(f"http://127.0.0.1:8000/?token={tokens}", permanent=True)
        res = redirect(f"https://muzamal-django-dot-cloud-work-314310.ew.r.appspot.com/?token={tokens}", permanent=True)
        return res
    except Exception as e:
        return Response(f"Not allowed {e}")
