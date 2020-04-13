---
title: React - Reconciliation
date: "2020-01-20T13:27:37.121Z"
template: "post"
draft: false
slug: "/posts/react/reconciliation"
category: "React"
tags:
  - "react"
  - "reconciliation"

description: "React reconciliation to improve efficiency"
---

# TL;DR

React tries its best, or **reconciles** in order to maximize efficiency

# Explanation

If `React` were to call `render()` by comparing all the elements, it would be extremely inefficent. Therefore, `React` tries its best to improve efficiency by updating only the changed part instead of compraing everything whenever a state is changed/updated.

### Elements Of Different Types

It changes the old tree and build the new tree

### DOM Elements Of The Same Type

It only changes updated parts like className or style

### Component Elements Of The Same Type

When a component updates, the instance stays the same, so that state is maintained across renders. React updates propos and goes through the lifecycle by calling `componentWillReceiveProps()` and `componentWillUpdate()`, and then `render()` is called in order to apply all the changes

### Recursing On Children

React iterates like you would do in an array. So try your best not to add an item at the beginning of the array, since the rest of children would be updated.

### Keys

But if you ad `key` to your children, React compares the keys and does not update if the keys in the old instance is ame as the keys in the new instance
