---
title: monolith
tags: posts
layout: layouts/post.njk
excerpt: I use 11ty for 90% of my web projects. the reason is, I run a web agency that caters to small business. Although I could just as quickly whip up an app like experience using vue, (in some cases maybe quicker) I tend to reach for 11ty because static sites are extremely snappy, great for seo and performance, and user experience and are easily interactive enough for business marketing websites.
---

# Build in Public: Erecting the great 11ty monolith

## The problem:

I use 11ty for 90% of my web projects. the reason is, I run a web agency that caters to small business. Although I could just as quickly whip up an app like experience using vue, (in some cases maybe quicker) I tend to reach for 11ty because static sites are extremely snappy, great for seo and performance, and user experience and are easily interactive enough for business marketing websites.

If you have watched my end to end 11ty deploy video, (if not highly recommend before erading this), you know that I have put some effort into streamlineing htings. DX features like componentization using sass and nunjucks, optimized layouts, data fetching and the like.

The problem I have had since day 1 with 11ty is that as I build more and more sites, the design of my infrastucture (the layouts etc,) improves each time and so by the time I have built the 10th site, the 1st site is out of date. Over time, maintaining all of hte different layouts and stylesheets becomes a nightmare. It dramatically re-inforces the reasoning behind building component libraries.

The problem is that 11ty components are nunjucks, not javascript files. So creating an npm library, while technically doable, is not the best option for keeping my design infrastructure in one space that is reachable to all sites that I deploy. Build once, use everywhere. Maintain in one place, not 20. The logic is obvious. My agency's needs have been pointing towards a better solution from day 1.

The soluition? 11ty Monolith.

A monorepo built around 11ty and designed to solve the following problems and allow use of 11ty at Agency scale. My personal mission is to contribute to the eradication of wordpress as defacto agency tooling.

1. No more copied templates and managing similar templates and styles over multiple sites
2. Agency sites at scale
3. No more maintenance nightmare - its all in one place
4. Component and layout libs keep creativity at the forefront while providing necessary automations and streamlines

## The 11ty Monolith Mission:

To leverage 11ty as a build system, along with select others, to allow for production of many sites at scale, for us as a high tech alternative to WP for digital agencies.

As such, the monolith is opinionated. It uses automations and tooling and tstin suites that cater to the industry needs.

## Goals:

1. Retain creative freedom of the devleopers on a per site basis while allowing for automation of the boring stuff.
2. Maintain technical excellence using modern best practice (SSG, Islands, Lazy Load etc.)

---

# BIP: progress

1. Trying to get slinkity to do what I want.

Where we left off today. Got vue templates configured to render and the mono set up. but slinkity limitation is that you can only used unnamed slots.

for my components to really work the way I need them too, I need named slots.

so there are 3 options:

1. build the named slot feature for slinkity
2. trasnition to web component using lit + experimental SSR
3. use astro - but i checked and I dont think they render vue slots either... could do futher testing and investigation of their code. A lot of slinkity is based on them anyways.

building the named slot feature is challenging. you need some interplay between 11ty transforming the attribute into an array of slot content, some of these will be other components, so you need to process those and inject proper SSR comments.

Then, vite will need to pick up the slot content array and find the vue component slots and populate them with the right html.

but its kind of working around the v-slot directive... which is whhat makes me want to lean into Collider/ Lit components.

where slots are native and don't require a different interface.

why doesn't vue process slots during SSR?

must be a slinkity only problem.

Get the data to vite and then it can handle the rest... right?
