---
title: "{{ replace .Name "-" " " | title }}"
publishDate: {{ .Date }} # used so we dont need to build future pages
# expiryDate: {{ dateFormat "2006-01-02T15:04:05Z07:00" (now.AddDate +1 0 0) }} # expire date, uncomment if you want old events to stop being published
draft: false

type: events
allday: false
date: {{ .Date }} # event start date
endDateTime: {{ dateFormat "2006-01-02T15:04:05Z07:00" (now.AddDate 0 0 +1) }} # event end date

# organizers: # a list of authors to show contact information

# Data for Front Page Events Carousel
location:
description:
cover: 
isExternalImage: false #set to true if the cover image is not a hugo asset/page resource
#hideFromCarousel: true
---

<!--more-->