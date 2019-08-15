---
title: Django App[03] API
date: "2019-06-17T15:54:37.121Z"
template: "post"
draft: false
slug: "/posts/DjangoApp API"
category: "Django"
tags:
  - "Python"
  - "Django"
  - "API"
description: "Following a Django tutorial on djangoproject.com to create a django app."
---

#1. API

```
python3 manage.py shell
```

This command gives Django the Python import path to `mysite/settings.py` file. You can use a command line like this in your terminal.

```
from polls.models import Choice, Question

Question.objects.all()
=> `<querySet []>`

## making a new question
from django.utils import timezone
q = Question(question_text="What's new?", pub_date=timezone.now())   ## giving two attributes according to how class was defined in models.py

q.save()   ## saving the object into the database.
q.id   ## now it has an id

##Access model field vaules via Python attributes
q.question_text   ## "What's new?"
q.save()    ## change values by changing attributes and save them

Question.objects.all() ##shows that the object has one question as created above.
=> `<QuerySet [<Question: Question object(1)>]>`
```

add `__str__()`method to the classes to make them represent the object better.

```
def __str__(self):
    return self.question_text or self.choice_text
```

You can do some other stuff with Django

```
#see all the questions
Question.objects.all()

#filter
Question.objects.filter(id=1)
Question.objects.filter(question_text__startswith='What')

#using timezone
from django.utils import timezone
current_year = timezone.now().year
Question.objects.get(pub_date__year=current_year)

#using a primary key and assigning a class to a variable
q = Question.object.get(pk=1)

#create choices
q.choice_set.create(choice_text='not much', votes=0)
q.choice_set.create(choice_text='The sky', votes=0)
c = q.choice_set.create(choice_text='just hacking in', votes=0)

#Question objects get access to Choice objects (one-to-one relationship as defined previously)
q.choice_set.all()   ##  shows the three choices made

#filter
Choice.objects.filter(question__pub_date=current_year

#delete
c = q.choice_set.filter(choice_text__startswith='just hacking')
c.delete()
```

#2. Development server

```
python3 manage.py createsuperuser
```

create a user who can login to the admin site
set an id, email, and password, then go onto the development server.
![Django Development Server](https://docs.djangoproject.com/en/2.2/_images/admin02.png)
Displayed stuff is provided by `django.contrib.auth`

You can add or change Question from the development server.
####Something to notice

1. The form is automatically generated from the Question model
2. The different model field types(`DateTimefield` and `CharField`) correspond to the appropriate HTML input widget.

- each type knows how to display itself in the Django admin

3. Each `DateTimeField` gets free JavaScript shortchuts

- Dates: a "Today" shortcut and calendar popup
- Times: a "Now" shortcut and a convenient popup
