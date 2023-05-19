---
name: {{ $term := .File.ContentBaseName }}"{{ replace $term "-" " " | title }}"
bio: "This is the bio for {{ $term | title }}"
avatar: "{{  $term }}.jpg"
socials:
    youtube:
    twitter:
    flickr:
    facebook:
---