from django.shortcuts import render
from django.http import request, HttpResponse


def home(request):
    return render(request, 'base.html', locals())


def bonhome(request):
    return render(request, 'bonhome.html', locals())