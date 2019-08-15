---
title: Django App[05] Form
date: "2019-06-17T20:17:37.121Z"
template: "post"
draft: false
slug: "/posts/DjangoApp View"
category: "Django"
tags:
  - "Python"
  - "Django"
  - "form"
description: "Following a Django tutorial on djangoproject.com to create a django app."
---

#1. Writing a simple form

```
<h1>{{ question.question_text }}</h1>

{% if error_message %}<p><strong>{{ error_message }}</strong></p>{% endif %}

<form action="{% url 'polls:vote' question.id %}" method="post">
{% csrf_token %}
{% for choice in question.choice_set.all %}
    <input type="radio" name="choice" id="choice{{ forloop.counter }}" value="{{ choice.id }}">
    <label for="choice{{ forloop.counter }}">{{ choice.choice_text }}</label><br>
{% endfor %}
<input type="submit" value="Vote">
</form>
```

1. each question `choice` displays a radio button
2. the `value` of each radio button is the associated question choice's ID
3. the `name` of each radio button is `choice`

- when somebody selects one of the radio buttons to submit a form, it will send the `POST` data `choice=#` where # is the ID of the selected choice

Using `method="post"` is important because the act of submitting this form will alter data server-side. (make sure not to use `method="get"`)

- always use `method="post"` when you create a form that alters data server-side

`forloop.counter` indicates how many times the `for` tag has gone through the loop

`{% csrf_token %}`: we need to worry about this

```
## views.py

from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.urls import reverse

from .models import Choice, Question

def vote(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    try:
        selected_choice = question.choice_set.get)pk=request.POST['choice'])
    except (KeyError, Choice.DoesNotExist):
        return render(request, 'polls/detail.html', {
            'question': question,
            'error_message': "You didn't select a choice",
        })
    else:
        selected_choice:votes += 1
        selected_choice.save()
        return HttpResponseRedirect(reverse('polls:results', args=(question.id,)))
```

1. `request.POST`: a dictionary-like object that lets you access submitted data by key name

- contains all given HTTP POST parameters
- `request.POST['choice']` returns the ID of the selected choice as a string
- its values are always strings
  - Django provides `request.GET` for accessing GET data in the same way

2. `request.POST['choice']` will raise `KeyError` if choice wasn't provided in POST data.

- checks for `KeyError` and redisplays the question form with an error message

3. choice returns `HttpReponseRedirect`, which takes a single argument: the URL to which the user will be redirected.
   - always return `HttpResponseRedirect` after successfully dealing with POST data
4. using the `reverse()` function in the `HttpResponseRedirect` constructor, which helps avoid having to hardcode a URL in the view function.

#2. Amend Views

- the shorter the code, the better it is

`ListView` and `Detail View` to abstract the concepts of "display a list of objects" and "display a detail page for a particular type of object"

- each generic view needs to know what model it will be acting upon. this is provided using the `model` attribute
- the `DetailView` generic view expects the primary key value captured from the URL to be called `pk`, so `question_id` has been changed to `pk`

`DetailView` and `ListView` generic views use a default template called `<app name>/<model name>_list.html` like `polls/index.html`
