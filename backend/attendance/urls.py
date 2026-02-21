from django.urls import path
from .views import AttendanceView, HealthCheckView

urlpatterns = [
    path('attendance/', AttendanceView.as_view(), name='attendance'),
    path('health/', HealthCheckView.as_view(), name='health'),
]
