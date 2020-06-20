from datetime import timedelta
from django.db .models import Q
from django.utils import timezone
from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions
from .models import Post
from .serializers import PostSerializer


class PostViewSet(ModelViewSet):
    queryset = Post.objects.all().select_related(
        "author").prefetch_related("tag_set", "like_user_set")
    serializer_class = PostSerializer
    # permission_classes = [permissions.AllowAny]  # FIXME: 인증적용

    def get_queryset(self):
        timesince = timezone.now() - timedelta(days=3)
        qs = super().get_queryset()
        qs = qs.filter(
            Q(author=self.request.user) |
            Q(author__in=self.request.user.following_set.all())
        )
        qs = qs.filter(created_at__gte=timesince)

        return qs
