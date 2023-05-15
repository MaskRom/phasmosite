from django.conf.urls.static import static
from django.conf.urls import include
from django.contrib import admin
from django.conf import settings
from django.urls import path, re_path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    re_path(r'^(?!admin|api).*$', include('app.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)