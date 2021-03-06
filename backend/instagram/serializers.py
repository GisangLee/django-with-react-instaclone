from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Post, Comment


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ["id", "username", "name", "avatar_url",
                  "is_staff", "is_active", "follower_set", "following_set", "is_superuser"]


class PostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)

    is_like = serializers.SerializerMethodField("is_like_field")

    def is_like_field(self, post):
        if "request" in self.context:
            user = self.context["request"].user
            return post.like_user_set.filter(pk=user.pk).exists()
        return False

    class Meta:
        model = Post
        fields = ["id", "author", "created_at", "photo",
                  "caption", "location", "tag_set", "is_like"]


class CommentSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ["id", "author", "message", "created_at"]
