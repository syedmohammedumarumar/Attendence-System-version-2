from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import AttendanceRequestSerializer
from .scraper import fetch_attendance
import logging

logger = logging.getLogger(__name__)


class AttendanceView(APIView):
    def post(self, request):
        serializer = AttendanceRequestSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response(
                {"error": serializer.errors},
                status=status.HTTP_400_BAD_REQUEST
            )

        user_id = serializer.validated_data["user_id"]
        password = serializer.validated_data["password"]

        try:
            data = fetch_attendance(user_id, password)
            return Response(data, status=status.HTTP_200_OK)

        except Exception as e:
            logger.error(f"Scraping error for user {user_id}: {str(e)}")
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )


class HealthCheckView(APIView):
    def get(self, request):
        return Response({"status": "ok"}, status=status.HTTP_200_OK)
