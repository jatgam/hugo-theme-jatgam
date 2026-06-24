# Jatgam — a Bulma-based Hugo theme

A full-featured, responsive [Hugo](https://gohugo.io) theme built on [Bulma](https://bulma.io).
It ships everything a content site needs — a blog/articles system, an events
calendar with ICS subscription and JSON feeds, authors, locations with maps, a
configurable homepage, a mega-menu navigation bar, and a library of Bulma
shortcodes — while staying modular enough that a bare landing page can switch
most of it off.

- **Responsive** Bulma layout, mobile-first
- **Articles / blog** with single + multi-page formats and author pages
- **Events** with a multi-source FullCalendar view, **ICS** (`webcal`)
  subscription feeds, and JSON feeds
- **Locations & maps** via Leaflet (opt-in)
- **Opt-in homepage widgets** (banner, events carousel, mission, recent posts,
  affiliates, notices, custom section)
- **Mega-menu** navigation, social/icon bars
- **Rich shortcodes** for Bulma columns, messages, tables, image handling,
  lightbox photo galleries, attachments, and more
- **Math** via auto-loaded MathJax (per-page, opt-in by use)
- **Themeable** via a single primary/secondary color and a per-site SCSS
  override hook
- RSS + JSON feed wiring, OpenGraph/structured-data, syntax highlighting

---

## Table of contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Quick start](#quick-start)
- [Configuration reference](#configuration-reference)
- [Content types](#content-types)
- [Homepage widgets](#homepage-widgets)
- [Navigation](#navigation)
- [Events & calendar](#events--calendar)
- [Locations & maps](#locations--maps)
- [Theming](#theming)
- [Shortcodes](#shortcodes)
- [Output formats](#output-formats)
- [A note on branches](#a-note-on-branches)
- [License](#license)

---

## Requirements

- **Hugo Extended ≥ 0.150** — the theme uses Dart Sass (bundled with the
  extended build) and the modern layout directory layout
  (`layouts/_partials`, `_shortcodes`, `_markup`).
- **Go** — the theme is consumed as a [Hugo Module](https://gohugo.io/hugo-modules/),
  so a working Go toolchain is needed to pull it.

> The `main` branch is **pure Hugo — no Node.js required.** (A separate
> `upgrade-bulma-1.0.0` branch that upgrades to Bulma 1.0 does require Node +
> PostCSS — see [A note on branches](#a-note-on-branches).)

---

## Installation

Add the theme to your site as a Hugo Module.

**1. Initialize modules in your site** (once, if you haven't already):

```sh
hugo mod init github.com/you/your-site
```

**2. Import the theme** in your site config (`hugo.toml`):

```toml
[module]
  [[module.imports]]
    path = 'github.com/jatgam/hugo-theme-jatgam'
```

**3. Pull it:**

```sh
hugo mod get -u github.com/jatgam/hugo-theme-jatgam
hugo server
```

To update later: `hugo mod get -u github.com/jatgam/hugo-theme-jatgam`.

> **Pin a branch.** A site is built against one specific branch. To track a
> branch other than `main`, append it: `path = 'github.com/jatgam/hugo-theme-jatgam@upgrade-bulma-1.0.0'`,
> or pin a version in `go.mod`.

---

## Quick start

> **Config location.** The preferred Hugo layout is a split config directory:
> put shared settings in **`config/_default/hugo.toml`** and per-environment
> overrides (analytics IDs, prod `baseURL`, etc.) in
> `config/<environment>/hugo.toml` (e.g. `config/production/hugo.toml`). A
> single root `hugo.toml` also works for simple sites. Examples below show the
> contents regardless of which file they live in.

A minimal config that turns on the basics:

```toml
baseURL = "https://example.com/"
title   = "My Site"

[module]
  [[module.imports]]
    path = 'github.com/jatgam/hugo-theme-jatgam'

[params]
  primaryColor   = "#00d1b2"     # theme accent (default shown)
  secondaryColor = "#f14668"
  mainSections   = ["articles"]  # which section(s) feed "recent posts"/listings
  logo           = "logo.png"    # in your site's assets/
  # disabled_logo = true         # render logo_text instead of an image
  # logo_text     = "My Site"

  # An empty Widgets table avoids `isset` warnings even if you use no widgets.
  [params.widgets]

[menu]
  [[menu.main]]
    name   = "Home"
    url    = "/"
    weight = 1
```

Create your first piece of content:

```sh
hugo new articles/hello-world.md
```

---

## Configuration reference

All settings live under `[params]` in your site config unless noted. Everything
is optional; sensible defaults apply.

### Site identity & SEO

| Param | Purpose |
|---|---|
| `primaryColor` | Theme accent color (default `#00d1b2`). |
| `secondaryColor` | Secondary accent (default `#f14668`). |
| `logo` | Path to a logo image in your site's `assets/` (default `logo.png`). |
| `disabled_logo` | `true` to render `logo_text` instead of an image. |
| `logo_text` | Text used as the brand when `disabled_logo` is set. |
| `defaultDescription` | Fallback `<meta name="description">`. |
| `defaultKeywords` | Fallback meta keywords (list). |
| `autoCover` | Auto-pick a cover image for pages that don't set one. |
| `enableMaps` | `true` loads Leaflet CSS/JS for location/map partials. |
| `mainSections` | Section(s) treated as "posts" for listings/recent-posts. |
| `dateFormat` | Go time layout for byline dates (default `2006-01-02`, e.g. `"January 2, 2006"`). |

### Organization / structured data

Used to emit Organization structured data and the footer's company block:

```toml
[params]
  orgName      = "My Org"
  altOrgName   = "MO"
  orgLogo      = "img/org-logo.png"
  foundingDate = "2001-01-01"
  sameAs       = ["https://twitter.com/...", "https://github.com/..."]
```

`params.contact` (see [Footer & contact](#footer--contact)) feeds both the
footer's company block and the Organization structured data in `<head>`.

### Author display

| Param | Purpose |
|---|---|
| `showAuthorLinks` | Link bylines to author pages. |
| `showAuthorSocials` | Show authors' social icons on author pages. |

### Footer & contact

The footer has three optional parts, all backward-compatible — a site that sets
none of them gets the original centered "Powered by Hugo · Bulma" footer.

**Company / contact block.** Set `params.contact` to render a company column
(org name + address + email + phone). The same block also feeds the
Organization structured data in `<head>`:

```toml
[params.contact]
  # --- shown in the footer company block ---
  email        = "contact@example.com"
  phoneDisplay = "(555) 123-4567"     # human-readable
  phoneHref    = "+15551234567"       # used in the tel: link (falls back to phoneDisplay)
  addressLines = ["123 Main St #100", "Town, ST 00000"]   # one <p>, lines joined by <br>

  # --- additionally used for schema.org PostalAddress in <head> ---
  streetAddress   = "123 Main St #100"
  addressLocality = "Town"
  addressRegion   = "ST"
  postalCode      = "00000"
  addressCountry  = "US"
```

The company column's heading uses `orgName` (falling back to the site `title`).

**Footer menu.** A `[[menu.footer]]` menu renders as a second column next to the
contact block. Its heading is `params.footerMenuTitle` (default `"Company"`).
Set `external = true` on an item to open it in a new tab:

```toml
[params]
  footerMenuTitle = "Company"

[[menu.footer]]
  name   = "Privacy Policy"
  url    = "/privacy/"
  weight = 1
[[menu.footer]]
  name   = "GitHub"
  url    = "https://github.com/you"
  weight = 2
  [menu.footer.params]
    external = true
```

**Copyright / credit line.** Add a `[params.footer]` table to opt into the
understated copyright line (matched to the company block's type scale).
The copyright text comes from Hugo's top-level `copyright` setting (falling back
to an auto-generated line):

```toml
copyright = "Copyright © 2026, My Org. All rights reserved."   # top-level Hugo setting

[params.footer]
  align     = "center"   # "center" or "left"
  poweredBy = true       # set false to drop the "Powered by Hugo · Bulma" credit
```

Without `[params.footer]`, the footer keeps its original centered layout.

The multi-column **nav-in-footer** widget is separate — see
[Homepage widgets](#homepage-widgets). See also
[Events & calendar](#events--calendar) for `params.events.*`.

---

## Content types

The theme ships archetypes for each content type. Scaffold with
`hugo new <section>/<name>.md`.

### Articles (blog)

`archetypes/articles.md`:

```yaml
---
title: "My Post"
date: 2026-06-23
authors:           # list of author identifiers (see Authors)
summary:           # optional summary for listings
# aliases:
#   - "/old-url/"
---
```

Put posts under a section (e.g. `content/articles/`) and add that section to
`mainSections` so it appears in listings and the recent-posts widget.

### Multi-page articles

For long-form content split across pages, use the `articles-multipage`
archetype. The landing page uses `layout: singlemultipage` and child pages are
ordered by `weight`. PDF and other resources can be attached via page
`resources`.

### Authors

Authors are a taxonomy named `authors`. Enable it in your site config so author
term pages exist:

```toml
[taxonomies]
  author = "authors"
```

Scaffold an author with `hugo new authors/jane-doe.md`:

```yaml
---
title: "Jane Doe"
name: "Jane Doe"
role: "Editor"
bio: "Short bio."
avatar: "jane-doe.jpg"
email:
socials:
  youtube:
  twitter:
  flickr:
  facebook:
  github:
  linkedin:
  website:
---
```

Reference authors from an article's `authors:` list to render bylines and
author boxes.

### Events

`hugo new events/spring-meet.md`:

```yaml
---
title: "Spring Meet"
publishDate: 2026-06-23   # so future events aren't built until their date
draft: false

type: events
allday: false
date: 2026-06-23          # event start
endDateTime: 2026-06-24T00:00:00Z  # event end

icsUID: <generated>       # leave as scaffolded — used for ICS feeds
icsUpdateCount: 0         # bump on every edit so ICS subscribers re-sync

# organizers:             # list of author identifiers for contact info
eventType: physical       # or "online"
# cancelled: true
# rescheduled: true
# previousStartDate:      # original date when rescheduling

location:                 # a location identifier (see Locations)
description:
cover:
isExternalImage: false    # true if cover isn't a Hugo asset/page resource
# hideFromCarousel: true
---
```

> **`icsUpdateCount` matters.** ICS subscribers only see an event change when
> its sequence number increases — bump `icsUpdateCount` every time you edit a
> published event.

See [Events & calendar](#events--calendar) for the calendar view and feeds.

### Locations

`hugo new locations/club-field.md`:

```yaml
---
title: "Club Field"
name: "Club Field"
address: '123 A Street, Town ST 00000'
street:
town:
postalcode:
state:
latitude:
longitude:
# mapPolygon:        # 3+ points draws a polygon on the map
#   - latitude:
#     longitude:
# gmapsPlaceId:
---
```

Locations render a Leaflet map when `params.enableMaps = true`.

---

## Homepage widgets

`home.html` renders a stack of **opt-in** widgets, each gated by a param — so a
landing page can enable one and a full site can enable several. They render in
this order:

```toml
[params.widgets]

  # 1. Hero banner band
  [params.widgets.homepageBanner]
    enable = true
    image  = "img/hero.jpg"   # asset path; resized to max 1440w
    size   = "medium"         # Bulma hero size: small | medium | large
    text   = "Welcome"

  # 3. Mission statement block
  [params.widgets.mission]
    enable = true
    title  = "Our Mission"
    text   = "..."

  # 4. Consumer override hook (see below)
  [params.widgets.customHomepageSection]
    enable = true

  # 5. Recent posts grid (from mainSections)
  [params.widgets.recentPosts]
    enable = true
    title  = "Recent Posts"
    blurb  = "Latest from the blog"

  # 6. Affiliate / partner logo strip
  [params.widgets.affiliates]
    enable = true
    title  = "Our Partners"
    [[params.widgets.affiliates.list]]
      name = "Partner"
      logo = "img/partners/partner.png"   # asset path
      url  = "https://partner.example"

  # Site-wide notices banner (dismissible)
  [params.widgets.notices]
    enable = true
    [[params.widgets.notices.list]]
      text     = "Registration is open!"
      url      = "/register/"      # optional link
      # expireAt = "2026-07-01T00:00:00Z"   # auto-hides after this time

  # Footer multi-column nav (built from the main menu)
  [params.widgets.navInFooter]
    enable                  = true
    nonDropDownTitle        = "Links"   # heading for the leftover non-dropdown items
    showNonDropDownOnRight  = false      # put that column on the right instead
```

The **nav-in-footer** widget reuses your `main` menu: each mega-menu section
becomes a footer column, and any top-level items that aren't dropdowns are
collected under a column titled `nonDropDownTitle`. The footer also lists your
`iconlinks` and `socialbar` menus.

**Item 2**, the events carousel, is configured separately under
`params.eventsCarouselHomepage` (see [Events & calendar](#events--calendar)).

**Custom homepage section.** When `widgets.customHomepageSection.enable` is set,
the theme renders `layouts/_partials/custom_homepage_section.html`. Create that
partial **in your site** to inject any markup you want at that slot.

The home page's own `.Content` (the body of `content/_index.md`) renders last.

---

## Navigation

`navbar.html` renders three Hugo menus:

- **`main`** — the primary nav, with **mega-menu** support.
- **`socialbar`** and **`iconlinks`** — icon-only links (e.g. social profiles)
  on the right. Put a [Remix Icon](https://remixicon.com/) `<i>` tag in the
  menu item's `pre` field.

### Simple menu

```toml
[[menu.main]]
  name   = "Articles"
  url    = "/articles/"
  weight = 10
```

### Mega-menu

A top-level `main` item becomes a multi-column mega-menu when its **first
child's `identifier` starts with `section.`**. There are three levels:

1. **Top-level item** — the dropdown trigger. Give it an `identifier` (its `url`
   is ignored for mega-menus).
2. **Section items** (`identifier = "section.*"`, `parent` = the top item's
   identifier) — each becomes a **column heading**. Its `post` field sets the
   column number (1–4).
3. **Leaf links** (`parent` = a `section.*` identifier) — the actual links under
   that column.

```toml
# 1. dropdown trigger
[[menu.main]]
  name       = "About"
  identifier = "menu.about"
  weight     = 1

# 2. a column (post = which column, 1–4)
[[menu.main]]
  name       = "Company"
  identifier = "section.company"
  parent     = "menu.about"
  post       = 1
  weight     = 1

# 3. links inside that column
[[menu.main]]
  name   = "Our Team"
  url    = "/about/team/"
  parent = "section.company"
  weight = 1
[[menu.main]]
  name   = "History"
  url    = "/about/history/"
  parent = "section.company"
  weight = 2
```

A top-level item with **no children** (or children that aren't `section.*`)
renders as a plain link or a simple (single-column) dropdown.

### Icon links

```toml
[[menu.iconlinks]]
  name   = "GitHub"
  url    = "https://github.com/you"
  weight = 1
  pre    = '<i class="ri-github-fill"></i>'
```

---

## Events & calendar

Events get a dedicated calendar page plus subscribable feeds.

### The calendar page

Create a page using the `calendar` layout (e.g. `content/calendar/_index.md`
with `layout: calendar`). It renders a [FullCalendar](https://fullcalendar.io)
view backed by your `events` section. Calendar assets load **only** on pages
that need them.

### Homepage events carousel

The homepage can show a Splide carousel of upcoming events (homepage widget
"item 2"):

```toml
[params.eventsCarouselHomepage]
  enable      = true
  label       = "Upcoming Events"
  auto_play   = true
  slide_speed = 5000             # ms between slides
  bg_img      = "img/event_bg.png"
```

Individual events can opt out with `hideFromCarousel: true` in their front
matter.

### Feed configuration

```toml
[params.events]
  calendarName     = "My Club Calendar"   # used in feed metadata
  color            = "#00d1b2"            # event color (defaults to primaryColor)
  defaultOrganizer = "My Club"            # fallback organizer in structured data
```

### Multi-source calendars (opt-in)

By default the calendar shows a single source: your `events` section. You can
add more feeds — internal sections or external URLs — under
`[[params.events.calendars]]`:

```toml
[[params.events.calendars]]
  id        = "rooms"
  url       = "/room-bookings/index.json"
  subscribe = "/room-bookings/index.ics"
  default   = false        # unchecked on load
  # name / color are optional fallbacks for external feeds (see below)
```

**An internal feed is just another content section** that emits JSON + ICS. Give
that section's `_index.md` the right outputs, plus the `title`/`color` the
legend should use:

```yaml
---
title: "Room Bookings"          # becomes the legend label
outputs: ["JSON", "Calendar"]   # JSON feed + ICS (both Hugo built-ins)
color: "#2a9d8f"                # becomes the legend swatch color
---
```

When more than one source is present, the calendar renders a **legend of
checkboxes** to toggle each feed on/off. Behavior:

- **Auto-hide** — if a feed's `url` maps to an internal section
  (`"<section>/index.json"`), the source is shown only when that section
  currently has entries. A configured-but-empty calendar disappears instead of
  showing a dead checkbox.
- **Single source of truth** — for internal-section feeds, the legend's
  **name and color come from that section's `_index.md`** (`title` + `color`),
  not from the config. External feeds use the config `name`/`color` instead.

A consumer that sets no `events.calendars` is completely unaffected — the page
behaves like a classic single calendar.

### Subscription & data feeds

The `events` section exposes, in addition to HTML:

- **ICS** — `events/index.ics` for `webcal://` calendar subscriptions.
- **JSON** — `events/index.json`, the FullCalendar feed shape.

Enable them in `content/events/_index.md`:

```yaml
---
title: "Events"
outputs: ["HTML", "JSON", "Calendar"]
---
```

`JSON` and `Calendar` (ICS) are Hugo **built-in** output formats — no custom
`[outputFormats]`/`[mediaTypes]` needed. Note these per-section `outputs` are
independent of the site-wide `[outputs]` block, so a site can restrict
everything else to HTML and still emit event feeds. The theme also wires **RSS**
and a **JSON feed** site-wide.

---

## Locations & maps

Set `params.enableMaps = true` to load Leaflet and render maps. Location pages
(see [Locations](#locations)) plot a marker from `latitude`/`longitude`, draw a
polygon from `mapPolygon`, and can link out to Google Maps via `gmapsPlaceId`.

---

## Theming

### Colors

Set your brand colors in config — they flow into the compiled SCSS:

```toml
[params]
  primaryColor   = "#00d1b2"
  secondaryColor = "#f14668"
```

`assets/css/stylesheet.scss` is the SCSS entry point. It is run through Hugo's
template engine, so Go-template actions work inside it (it reads
`.Site.Params.primaryColor` / `secondaryColor` and resolves background images).

### Per-site CSS overrides

The theme's `assets/css/custom_styles.scss` is an **empty placeholder**. To add
your own styles, create **`assets/css/custom_styles.scss` in your site** — it
shadows the theme's copy and is appended into the compiled stylesheet (and is
also template-processed). This is the right place for all site-specific CSS.

> On the `main` branch (Bulma 0.9.4) the `--bulma-*` CSS custom properties do
> **not** exist. Use Sass `$variables`, Bulma's generated utility classes
> (`.has-background-white-ter`, `.is-primary-light`, …), or explicit hex.

### Fonts

Loaded from Google Fonts: **Bebas Neue** (`.is-family-title`), Roboto (body),
Montserrat (secondary), Inconsolata (mono).

---

## Shortcodes

| Shortcode | Purpose | Key params |
|---|---|---|
| `img` | Responsive image with caption/link, optional float | `src`, `alt`, `caption`, `link`, `isExternal`, `width`, `maxWidth`, `pullLeft`, `pullRight` |
| `imgResize` | Resize/crop an image to a target | `src`, `width`, `ratioWidth`, `ratioHeight`, `quality` |
| `photoGallery` | Thumbnail grid + lightbox (see [below](#photo-galleries)) | positional image names, or `datafile` |
| `bulmaColumns` / `bulmaColumn` | Bulma column layout (wrap columns in `bulmaColumns`) | `style` |
| `bulmaMessage` | Bulma message box | `style` |
| `bulmaNotification` | Bulma notification box | `style` |
| `bulmaTable` | Styled, optionally scrollable table | `isScrollable`, `customClasses` |
| `bulmaContent` | Wrap Markdown in a Bulma `.content` block | — |
| `attachments` | List page-resource files matching a pattern | `pattern`, `title` |
| `resourceLink` | Link to a page resource with icon/size | `resource`, `showIcon`, `showSize` |
| `staticref` | Reference a file in `static/` | (positional path) |
| `center` / `pullLeft` / `pullRight` | Alignment/float wrappers | — |
| `sectionTitle` | Styled section heading | — |

Example:

```md
{{</* img src="diagram.png" alt="Architecture" caption="System overview" maxWidth="640px" */>}}

{{</* bulmaMessage style="is-warning" */>}}
Heads up — this is a warning.
{{</* /bulmaMessage */>}}
```

### Photo galleries

`photoGallery` renders a centered grid of square thumbnails that open a Bulma
**modal lightbox** with prev/next navigation, lazy-loaded full-size images, and
captions. It has two modes.

**1. Page-resource mode (most common).** Pass image filenames (page-bundle
resources) as positional arguments. The shortcode auto-generates 75×75
center-cropped thumbnails (non-square images are padded onto a white square),
and pulls each photo's caption from the **resource's `title`** (and optional
`description`) declared in the page's front matter:

```yaml
---
title: "My Gallery Page"
resources:
  - src: photo1.jpg
    title: "First photo"
    params:
      description: "An optional caption shown in the lightbox."
  - src: photo2.jpg
    title: "Second photo"
---
```

```md
{{</* photoGallery "photo1.jpg" "photo2.jpg" */>}}
```

You can list several galleries on one page; each is keyed independently. Globs
work too (e.g. `"gallery/*.jpg"`), resolved via the page's resources.

**2. Data-file mode.** For pre-built or externally hosted galleries (e.g.
Flickr), pass `datafile="<name>"` to read `data/<name>.{yaml,json,toml}`. The
file supplies a `photos` array with thumbnail + full-size URLs you provide
yourself:

```md
{{</* photoGallery datafile="trip2024" */>}}
```

```yaml
# data/trip2024.yaml
photos:
  - title: "Sunset"
    description: "Optional caption."   # optional
    photo_url: "https://flickr.com/…"  # optional: links the caption title out
    thumb_url: "https://…/thumb.jpg"
    thumb_w: 75
    thumb_h: 75
    url: "https://…/large.jpg"
    url_w: 1024
    url_h: 768
```

The gallery's modal/lightbox JavaScript is bundled by the theme — no extra
setup.

### Math (MathJax)

The theme ships a `mathjax` **code-block render hook** plus auto-loading of
[MathJax 3](https://www.mathjax.org/). MathJax is loaded **per page, only when
needed** (and from CDN), so pages without math stay lightweight.

**Display / block math** — write a fenced code block tagged `mathjax`. This is
the primary path and is what triggers MathJax to load on the page. Full LaTeX,
including AMS environments and equation numbering (`tags: 'ams'`), is supported:

````md
```mathjax
\begin{aligned}
  E      &= mc^2 \\
  v_2    &= v_1 \times \sqrt{1 \div r}
\end{aligned}
```
````

**Inline math** — use `$$ … $$` (double dollar) within a paragraph:

```md
Let $$r$$ be the scale factor, so the area shrinks to $$1 \div r^2$$.
```

> **Inline math needs the library loaded.** Only a fenced `mathjax` block sets
> the per-page flag that loads MathJax. Inline `$$…$$` renders only on pages
> that also contain at least one `mathjax` block. (Delimiters: inline `$$…$$`,
> display `$$$…$$$` — the code block emits the latter for you.)

Other render hooks under `_markup/` cover image and link rendering.

---

## Output formats

- **HTML** — all pages.
- **RSS** + **JSON feed** — wired site-wide in `head.html`.
- **ICS** + **JSON** — for the `events` section (calendar subscriptions + feed).

Restrict outputs per section/kind with Hugo's standard `[outputs]` config if you
don't need them all — for example, an HTML-only site:

```toml
[outputs]
  home     = ['HTML']
  page     = ['HTML']
  section  = ['HTML']
  taxonomy = ['HTML']
  term     = ['HTML']
```

---

## A note on branches

This theme maintains two branches that are **not interchangeable** — a site is
built against one:

| | `main` | `upgrade-bulma-1.0.0` |
|---|---|---|
| Bulma | **0.9.4** | **1.0** |
| Colors | Sass `$variables` (no `--bulma-*`) | Bulma CSS custom properties (`var(--bulma-primary)`) |
| Toolchain | **Pure Hugo, no Node** | **Requires Node + PostCSS** (purgecss; site provides `postcss.config.js`) |
| Status | Stable | Stabilizing |

If the CSS or colors look wrong, the most common cause is building a site
against the wrong branch. **`main` is the stable, no-Node branch** and is what
most sites should use. The Bulma 1.0 branch is still being proven out.

---

## License

[MIT](LICENSE) © Jatgam
