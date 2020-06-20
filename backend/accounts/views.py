from datetime import timedelta
from django.db .models import Q
from django.contrib.auth import get_user_model
from django.utils import timezone
from django.shortcuts import render
from rest_framework import permissions
from rest_framework.generics import CreateAPIView
from.serializers import SignupSerializer


class SignupView(CreateAPIView):
    model = get_user_model()
    serializer_class = SignupSerializer
    # permission_classes = [
    #     permissions.AllowAny,
    # ]

    def get_queryset(self):
        timesince = timezone.now() - timedelta(days=3)
        qs = super().get_queryset()
        qs = qs.filter(
            Q(author=self.request.user) |
            Q(author__in=self.request.user.following_set.all())
        )
        qs = qs.filter(created_at__gte=timesince)

        return qs
