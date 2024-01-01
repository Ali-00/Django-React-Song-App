from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


# def get_tokens_for_user(user):
#     refresh = RefreshToken.for_user(user)
#     return {
#         "refresh": str(refresh),
#         "access": str(refresh.access_token)
#     }


# @login_required
# def social_login_redirect(request):
#     try:
#         user = User.objects.get(username=request.user.username)
#         tokens = get_tokens_for_user(user).get("access")
#         res = redirect(f"http://127.0.0.1:8000/api/token/", permanent=True)
#         return res
#     except Exception as e:
#         return Response(f"Not allowed {e}")



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["username"] = user.username

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(["GET"])
def Routes(request):
    routes = ["/api/token", "/api/token/refresh"]
    return Response(routes)
