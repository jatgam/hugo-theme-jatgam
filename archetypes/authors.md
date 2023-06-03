---
title: {{ $term := .File.ContentBaseName }}"{{ replace $term "-" " " | title }}"
name: {{ $term := .File.ContentBaseName }}"{{ replace $term "-" " " | title }}"
role:
bio: "This is the bio for {{ $term | title }}"
avatar: "{{  $term }}.jpg"
socials:
    youtube:
    twitter:
    flickr:
    facebook:
    github:
    linkedin:
    website:
---