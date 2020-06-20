from datetime import timedelta
from django.db .models import Q
from django.contrib.auth import get_user_model
from django.utils import timezone
from django.shortcuts import render
from rest_framework import permissions
from rest_framework.generics import CreateAPIView, ListAPIView
from.serializers import SignupSerializer, SuggestionUserSerializer


class SignupView(CreateAPIView):
    model = get_user_model()
    serializer_class = SignupSerializer
    permission_classes = [
        permissions.AllowAny,
    ]


class SuggestionListAPIView(ListAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = SuggestionUserSerializer
