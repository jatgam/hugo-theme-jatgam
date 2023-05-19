---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
# expiryDate: {{ dateFormat "2006-01-02T15:04:05Z07:00" (now.AddDate +1 0 0) }} # expire date, uncomment if you want old events to stop being published
draft: false

type: events
allday: false
startDateTime: {{ .Date }} # event start date
endDateTime: {{ dateFormat "2006-01-02T15:04:05Z07:00" (now.AddDate 0 0 +1) }} # event end date

# Data for Front Page Events Carousel
location:
description:
cover: 
#hideFromCarousel: true
---

<!--more-->