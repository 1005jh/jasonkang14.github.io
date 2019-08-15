---
title: Django App[01] Basic setup
date: "2019-06-17T14:27:37.121Z"
template: "post"
draft: false
slug: "/posts/DjangoApp Basic Setup"
category: "Django"
tags:
  - "Python"
  - "Django"
description: "Following a Django tutorial on djangoproject.com to create a django app."
---

Installing Django was difficult because I did not know the difference between Python and Python3. With the help of a mentor and fellow colleagues, I got the job done.

Here are some important words for which I want to make a remark to help me understand how to make a Django app better.

#1. Creating a Project
`django-admin startproject "foldername"`<br>

- this command makes a folder that includes necessary Python3 files to start a Django project.
  `manage.py`: a command-line utility that lets you interact with Django project
  `mysite/`: a Python package
  `mysite/__init__.py`: an empty file that tells Python that this directory is must be considered a Python package.
  `mysite/settings.py`: settings/configuration for this Django project.
  `mysite/urls.py`: the URL declarations for this project. something like table of contents
  `mysite/wsgi.py`: an emtry-point for WSGI-compatible seb servers.
- I have no idea what the empty-point or WSGI-compatible mean. gotta do more research on it

#2. The development server
`runserver` command: starts the development server on the internal IP at port 8000.

- if you use this command, you can see something...

#3. Creating the Polls app

```
python3 manage.py startapp polls
```

`startapp` command makes a folder that includes necessary Python3 files to start a Django app like `startproject` command does for a project. <br>

- App: a Web application that does something
- Project: a collection of configuration and apps for a particular website.

So a project consists of many apps, and an app can be used for different projects. <br>
It looks like this project is going to have a polls app.

#4. Write your first view

```
## polls/views.py

from django.http import HttpResponse

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")
```

In order to call the view, gotta map it to a URL, which requires a URLconf. <br>
To do this, create a `urls.py`file under `polls/` and write the code below into it.

```
## polls/urls.py

from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
]
```

Now point the root URLconf at the `polls.urls` module.

```
## mysite/urls.py
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('polls/', include('polls.urls')),
    path('admin/', admin.site.urls),
]
```

`include()`function allows referencing other URLconfs.

- Django chops off whatever part of the URL matched up to that point and send the remaining string to the included URLconf for further procesing.
- use this when you include other URL patterns.

##`path()` function

- takes four argument and returns an element for inclusion in urlpatterns. <b>route</b> and <b>view</b> are required <b>kwargs</b> and <b>name</b> are not
- <b>route</b>: a string that contains a URL pattern.
  - in the example of path('polls/', include('polls.urls')), Django starts at the first pattern, which is <b>'polls/'</b> and makes its way down the list
  - the string may contain angle brackets to capture a part of the URL and send it as a keyword argument to the <b>view</b>
- <b>view</b>: view function or the result of `as_view()` for class-based views. could also be an `django.urls.include()`
- <b>kwargs</b>: allows you to pass additional arguments to the view function or method
- <b>name</b>: naming your URL lets you refer to it unambiguously from elsewhere in Django, allowing you to make global changes to the URL patterns
