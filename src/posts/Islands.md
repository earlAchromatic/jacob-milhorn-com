---
tags: ['posts', 'architecture', 'ssg']
title: Islands Architecture and the real MVP
layout: layouts/post.njk
excerpt: I use 11ty for 90% of my web projects. the reason is, I run a web agency that caters to small business. Although I could just as quickly whip up an app like experience using vue, (in some cases maybe quicker) I tend to reach for 11ty because static sites are extremely snappy, great for seo and performance, and user experience and are easily interactive enough for business marketing websites.
---

# Dynamic Imports: The real MVP of Island Architecture

## What is Islands?

Curious about the new buzzword making rounds recently?

![](/images/404.svg)

Islands architecture is a way of combining traditional, statically generated websites with the more modern SPA approach. When working together, the SPA-style 'app' is no longer in control of the entire site and all the routes, but is merely an 'island' of interactivity that exists on the page.

By using the two concepts harmoniously, we can create both extremely performant and rich-as-ever user experiences. Let's dig a bit deeper into the problems island architecture solves and how it solves them.

## The problem Island's Solve

I have been fascinated with JAMstack since beginning my web dev journey back in early 2020.

It came with promises of lighting fast loading times and among other things, simplicity.

Most of my time is spent building content-driven sites for clients using Static Site Generation SSG techniques and specifically 11ty, all very JAMstack laden stuff.

Other times I find myself leaning heavily on Vue for anything that doesn't really require SEO. Those things end up being mostly dashboard-centric tooling.

This is a bit of a dilemma though. Vue has a great development experience. Single file components are a dream and it makes creating rich interactive experiences pretty seamless.

On the other hand, I find myself hesitant to reach for such a great tool anytime I have to go near SEO-required projects. Which, frankly, is most of them.

> Aside - its not that google can't crawl SPAs... it can. but if you have content hidden behind walls of interactivity, then you have to start doing other techniques like... pre-rendering and hydration. All stuff that Island's takes care of anyways. end Aside.

My static site generation workflow results in highly optimized sites, so I like to stick close to that. Wouldn't it be great if you could sprinkle interactive components throughout your site wherever they make sense without commiting to an SPA and while still delivering static content? Enter Islands Arch.

## So How Does it Actually work?

If you're like me, you might be curious about a technology's underlying mechanism before adopting it. I was and so I looked into the current libraries and tooling for implementing Islands to see if I could find the important bits. We'll talk about that in a second. But first lets lay the ground work.

A key component of Island Architecture is partial hydration. You write your interactive "island" components in your framework of choice.

Then your site, islands included, gets rendered to static html at build time so that your load times are as quick as possible. When the appropriate events trigger the component, maybe the user scrolls down to see the component, then the component is hydrated on demand - that is the javascript module containing the component is requested then and not before. The 'partial' in partial hydration refers to only hydrating part of the page with data, not the entire app like you might when you use Nuxt or some other SSR framework.

A big reason we would want to do this is to de-emphasize javascript a bit and default to shipping as little as possible to the browser, all while maintaining the ability to write app-like components. The phrase 'opt-in' instead of 'opt-out' is often used to describe this javascript paradigm shift. [This](https://docs.astro.build/en/core-concepts/component-hydration/) explanation of Partial Hydration from Astro is pretty helpful if you are totally new to the subject.

So the question becomes, how is partial hydration implemented?

## The real MVP: `import()`

The common denominator in each of the following frameworks turns out to be a simple function in ES standard lib: `import()`.

By importing scripts (aka components) dynamically, we can control when the browser requests them. This lets us do fancy things like lazy-loading entire framework components (but not necessarily the framework) or load as soon as the main thread is idle. Here is a brief example of the mechanism.

This JS file would be included as the source of a script tag inside of `index.html`:

```js
//main.js

setTimeout(() => {
  import('./someComponent.js');
}, 5000);
```

This single-file Component would be compiled automatically by Vite.js, for instance:

```js
//someComponent.js (Vue SFC)
<template>
	<div>
		...
	</div>
</template>

<script setup>
	...
</script>

<style scoped>
	...
</style>
```

and here is an example of the component being requested after the required amount of time in `setTimeout()`.

![](Delayed_Gratification.gif)

This is a dumbed down example, but this delayed request is what happens behind the scenes in each of these tools. Lets take a closer look.

### Astro

[Astro](https://astro.build) is thought of as the leader in the Island architecture/Partial Hydration space, having raised $7M in funding to develop their tooling.

This snippet is found in `hydrate.ts` and runs during build. This operation is building the script that runs on the client before hydration. Notice that the truthy branch of the ternary operation immediately imports the resolved component path while the falsy branch sets the `import()` in a string to save for later when we want to request the component from the client.

```ts
hydrationSource += renderer.source
  ? `const [{ ${componentExport.value}: Component }, 
		{ default: hydrate }] = await Promise.all([
		import("${await result.resolve(componentUrl)}"), 
		import("${await result.resolve(renderer.source)}")]);
  return (el, children) => hydrate(el)(Component, ${serializeProps(
    props
  )}, children);`
  : `await import("${await result.resolve(componentUrl)}");
  return () => {};
`;
```

Pretty neat huh? You will see a similar pattern in the following projects.

### Slinkity

[Slinkity](https://slinkity.dev/). Ah, Slinkity. The project with the most promise for my day-to-day workflow has the quirkiest name. Every 11ty plugin has to end in `-ty`, doesn't it though. That's exactly what this tool does. It combines 11ty and Vite in order to let you write your SSG templates in framework languages and also handles all the partial hydration.

This `if-else` statement takes place in `toLoaderScript.js` if you are curious. This is used to assign the script that gets sent to the browser for a given component. The `hydrate === 'lazy'` option is where our magic imports are.

```js
if (hydrate === 'eager') {
  //eager mode just loads the script as per usual
  return `<script type="module">
    ... 
  </script>`;
} else if (hydrate === 'lazy') {
  // this is where it gets interesting
  return `<script type="module">
    import { lazyLoader as lazyLoader${id} } from "${PACKAGES.client}";
  
    lazyLoader${id}({ 
      id: "${id}",
      toComponent: async () => await import(${componentImportPath}), 
      toRenderer: async () => await import(${rendererImportPath}),
      props: ${stringify(props)},
      children: \`
${children ?? ''}\`,
    });
  </script>`;
}
```

### Iles

[Iles](https://iles.pages.dev/) is a Vue-first Island Architecture Implementation. It lets you template content and build components in other frameworks as well, which is why in the following snippet you see dynamic imports for framework paths as well as components.

This template literal is found inside a render function inside of `Island.vue`, a Vue component that embodies every Iles' Island.

```js
${
  isEager(this.strategy)
    ? `import framework from '${frameworkPath}'
	   import { ${this.importName} as component } from '${componentPath}'`
    : `const framework = async () => (await import('${frameworkPath}')).default
const component = async () => (await import('${componentPath}')).${this.importName}`
}

```

### Lit SSR

[Lit](https://lit.dev/)

```


```

### The Major Benefit

Without dynamic imports, Island architecture wouldn't make nearly as much sense, since you would be loading all JS right out of the gate. `import()` lets us load components precisely when we want to - a powerful mechanism that powers our Islands. This may seem obvious to some, but for me it was the moment it all 'clicked' for me.

These aren't new necessarily. They have been used in React to lazy load components since 2018

## The State of Islands

### A landscape of promises

At the time of this writing, all of the tooling I investigated is still under heavy development. None have reached 1.0 and all are experimental. While this is a short-term bummer, I am excited to see these each progress and

### A few alternative approaches

There were a few things I tried along the way before Island Architecture really existed in any usable way.

One solution is to just build a vue app and embed it manually into pages as needed. This is a bit tedious to do for just a few components by the time you introduce an entirely separate build tool chain.

Another library that i became pretty intimate with is Alpine.js. It functions like Vue without v-dom and let's you build data driven components as needed.

Pretty close to my desired solution, right? No build step, just include the script tags with your html components. Along with Nunjucks templating in 11ty, this actually did (and still does) serve me pretty well as far as interactivity goes. See walkthrough of current setup.

(re)sources

https://viewsonvue.com/islands-architecture-in-vue-with-m-ximo-mussini-vue-170
