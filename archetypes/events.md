---
title: "{{ replace .Name "-" " " | title }}"
publishDate: {{ .Date }} # used so we dont need to build future pages
# expiryDate: {{ dateFormat "2006-01-02T15:04:05Z07:00" (now.AddDate +1 0 0) }} # expire date, uncomment if you want old events to stop being published
draft: false

type: events
allday: false
date: {{ .Date }} # event start date
endDateTime: {{ dateFormat "2006-01-02T15:04:05Z07:00" (now.AddDate 0 0 +1) }} # event end date

icsUID: {{ printf "%.30s" (base64Encode (sha256 (printf "%s%s" .Date .Name))) }} # This should remain untouched, and is used for ical feeds
icsUpdateCount: 0 # This unfortunately needs to be incremented every time an event is changed so subscribed ics feeds will update the event

# organizers: # a list of authors to show contact information

eventType: physical # online
# cancelled: true
# rescheduled: true
# previousStartDate: # set to the original date if rescheduling
# Data for Front Page Events Carousel
location:
description:
cover: 
isExternalImage: false #set to true if the cover image is not a hugo asset/page resource
#hideFromCarousel: true
---

<!--more-->