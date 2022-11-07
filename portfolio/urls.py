from django.contrib import admin
from django.urls import path, re_path
from app import views

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path('^$', views.home, name='home'),
    re_path('^bonhome/$', views.bonhome, name='bonhome')
]
