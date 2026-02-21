from rest_framework import serializers


class AttendanceRequestSerializer(serializers.Serializer):
    user_id = serializers.CharField(max_length=50, required=True)
    password = serializers.CharField(max_length=100, required=True)

    def validate_user_id(self, value):
        if not value.strip():
            raise serializers.ValidationError("User ID cannot be empty.")
        return value.strip()

    def validate_password(self, value):
        if not value.strip():
            raise serializers.ValidationError("Password cannot be empty.")
        return value
