---
title: Django App[04] View
date: "2019-06-17T16:17:37.121Z"
template: "post"
draft: false
slug: "/posts/DjangoApp View"
category: "Django"
tags:
  - "Python"
  - "Django"
  - "View"
description: "Following a Django tutorial on djangoproject.com to create a django app."
---

####view : a type of Web page in a Django application that generally servers a specific function and a specific template.

#1. Writing a View

- web pages and other content are delivered by views
- each view is represented by a simple Python function: Django chooses a view by examining the URL that's requested.
- but it doesn't examine the entire URL, it looks for just enough information to display the requested web page

####Example: request /polls/34

1. loads `mysite.urls.py`
2. finds the variable named `urlpatterns`
3. traverses the patterns in order
4. finds the match at `polls/`
5. strips off the matching text and sends the remianing text to the "polls.urls"
6. matches `<int:question_id>/`
7. results in a call to the `detail()` like below

```
deetail(request=<HttpRequest object>, question_id=34)
```

- using angle brakets captures part of the URL and sends it as a keyword argument to the view function
- `:question_id>` part of the string defines the name that will be used to idenfity the matched pattern
- `<int:` part is a converter that determines what patterns should match this part of the URL path

#2. Writing a View That Does Something
####Each view is responsible for doing one of two things

1. returning an `HttpResponse` object containing the content for the requested page
2. raising an exception such as `Http404`

#####A shortcut: `render()`
no need to import `loader` and `HttpResponse`

- the `render()` function takes the request object as its first argument, a template name as its second argument and a dictionary as its optional argument

#3. Raising a 404 Error

- raises an exception if a requested id does not exist.
- use `get()` and raise `Http404` if the object does not exist. --the object created in detail.html, which means that there is no question made
- `The get_object_or_404()` function

1. takes a Django model as its first argument and an arbitrary number of keyword arguments
2. passes to the get() function of the model’s manager.
3. raises Http404 if the object doesn’t exist.

#4. Use the template system

- The template system uses dot-lookup syntax to access variable attributes.

```
## template/detail.html

<h1>{{ question.question_text }}</h1>
<ul>
{% for choice in question.choice_set.all %}
    <li>{{ choice.choice_text }}</li>
{% endfor %}
</ul>
```

- first Django does a dictionary look-up to find the object question, and fails
- then it tries an attribute look-up, then succeeds
- if it fails the attribute look-up, it would try a list-index look-up

Method-calling happens in the {% for %} loop: question.choice_set.all is interpreted as the Python code question.choice_set.all(), which returns an iterable of Choice objects and is suitable for use in the {% for %} tag.

#5. Removing Hardcoded URLs
`index.html`is originally written as below

```
<li><a href="/polls/{{ question.id }}/">{{ question.question_text }}</a></li>
```

However, this would cause a problem if there are many templates to work with because there would be a lot of templates for which you need to hardcode. Since you have defined the name argument in the `path()` functions in the `polls.urls` module, you can change the hard-coded part like below. Using {% url %} template tag

```
<li><a href="{% url 'detail' question.id %}">{{ question.question_text }}</a></li>
```

```
## polls/urls.py

urlpatterns = [
    path('', views.index, name='index'),
    path('<int:question_id/', views.detail, name='detail'),
    path('<int:question_id>/results/', views.results, name='results'),
    path('specifics<int:question_id>/vote/', views.vote, name='vote'),
]

## the 'name' value as called by the {% url %} template tag
```
