---
title: "{{ replace .Name "-" " " | title }}"
#date: {{ .Date }} # Inherit the main articles date by default
weight: 
layout: single.multipage
# aliases:
#     - ""
resources:
    - params:
          icon: pdf
      src: '**.pdf'
---

