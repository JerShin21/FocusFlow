from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name", "password", "date_joined"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
    def update(self, instance, validated_data):
        instance.username = validated_data.get("username", instance.username)
        instance.email = validated_data.get("email", instance.email)
        instance.first_name = validated_data.get("first_name", instance.first_name)
        instance.last_name = validated_data.get("last_name", instance.last_name)
        
        # Check if a new password is provided
        password = validated_data.get("password", None)
        if password:
            instance.set_password(password)
        
        instance.save()
        return instance

    
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = User.USERNAME_FIELD

    def validate(self, attrs):
        username = attrs.get(self.username_field)
        password = attrs.get('password')
        
        user = User.objects.filter(username=username).first() or User.objects.filter(email=username).first()

        if user is None:
            raise serializers.ValidationError(
                'No active account found with the given credentials'
            )

        credentials = {
            'username': user.username,
            'password': password
        }

        user = authenticate(**credentials)

        if user is None or not user.is_active:
            raise serializers.ValidationError(
                'No active account found with the given credentials'
            )

        return super().validate(credentials)
    