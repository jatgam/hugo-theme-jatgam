---
title: "{{ replace .Name "-" " " | title }}"
#date: {{ .Date }} # Inherit the main articles date by default
weight: 
layout: singlemultipage
# aliases:
#     - ""
resources:
    - params:
          icon: pdf
      src: '**.pdf'
---

