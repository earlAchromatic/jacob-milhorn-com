---
layout: layouts/post.njk
title: flash-of-unstyled-content for web components
tags: posts
excerpt: I use 11ty for 90% of my web projects. the reason is, I run a web agency that caters to small business. Although I could just as quickly whip up an app like experience using vue, (in some cases maybe quicker) I tend to reach for 11ty because static sites are extremely snappy, great for seo and performance, and user experience and are easily interactive enough for business marketing websites.
---

## So you wanna build with web components?

### Solving a Common Web Component Issue: Flash of Unstyled Content

So you are just starting out with web components, your super excited to test out the tech, you've been hearing lot about them.

You can finally rid yourself of any obligation to one framework and slap your custom designed components into your app...

but somethings wrong. When the page loads, you notice something- a jarring little glitch right as the content finishes. loading.

<figure>
<image src="/images/somuchfouc.gif"/>
</figure>

You sigh in disbelief. your shiny new web component is broken out of the box.

If you're like me, and this kind of subtle aesthetic detail is important to you, rest easy knowing that there is a pretty simple fix.

but first, what is the problem exactly?

## The source of the issue

We know that the flash of unstyled Content happens because there is a delay between when we are seeing the custom element on the screen and when the styling is being applied.

Depending on what styles you are expecting, this can end up beind rather dramatic.

I had never seen this exact phenomenon though until owkring with WC's. What's the deal?

Using Web components requires javascript to define the custom element, encapsulated logic and styles htat get injected into the web component's shadow DOM.

So when a browser requests your page, it starts to download and rneder the assets. Html, styles, javascript, and then it runs the script where you define your custom elements using `customElements.define()` and hte ShadowDom is injected into the element in the root DOM.

Unless you are dynamically adding your custom element ot hte dom, you probably already registered your custom element somewhere on your page simply by adding it to the page like any other elmenet.

```html
<my-custom-el></my-custom-el>
```

This is one cool thing about Web Components- you can register them and then actually dynamically define them later on if you want.

but maybe your are using a static site generator and want an island-type arhcitecture wehre you just ahve small sections of interactivity. You could use petitie-vue or alpine.js, but you decide web components are a good fit - and I would agree.

The real problem is, your component is registered and showing up on the page, but any styling specific to the web component is not yet defined. styling specific to the web component exists within the shadow dom, and isn't available until you define the component in JS.

That is why there is a brief delay between when the component is loaded on the page and the styling specific to the component is applied, which causes the undesirable Flash.

## The Fix

The fix is actually really simple. You just pre-style the registered component until it is defined and then once it is defined, remove the styles.

If only there was a selector for undefined components....

there is! There is a psuedo-class `:defined` that we can pair with the pseudo-class `:not()` to end up with `:not(:defined)`.

We add this to our custom element, along with any styles you want to use to hide the element. This can go in your global style.css file or the like.

```css
my-custom-el:not(:defined) {
  display: inline-block;
  height: 100vh;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}
```

keep in mind that default opacity is 1, so by setting opacity to 0 in the `:not(:defined)` state and use the transition property, we create a fade transition.

After `<my-custom-el>` has been defined, the selector (`my-custom-el:not(:defined)`) no longer matches and the opacity changes to 1, making the defined component visible on the page.

<figure>
<image src="/images/nomorefouc.gif"/>

</figure>

Note that if the defined component styles include explicit height changes from the pre-styles, you will end up with a different type of glitch: cumulative layout shift (CLS). This one is also easily solvable if you know what the component height will be beforehand.

## Aside: why don't I see FOUC in Vue.js?

So, we have our working, flashless web component. Sweet relief.

But the curious among you may wonder... why don't we see a similar thing happen in frameworks like Vue? I have worked with Vue 3 since it's initial release a few years ago and have never seen FOUC happen.

Let's think about the sequence of components loading on the page. First, the browser request resources, starts downloading and rendering on the page. The body element contains the following:

```html
<body>
  <div id="app"></div>
  <script src="bundle.js" />
</body>
```

and doesn't yet contain any components inside your app.

Once the script with the bundle runs and loads your app, components start going through their respective lifecycles and get mounted to the page. As they do, their styles are already all available to them unlike web components.

There is a way to define web components using Vue and in this case, you would have potential for the original situation we remedied above.

## Conclusion

So we have seen that web components are fundamentally different in their mounting behaviour and have to wait for javascript to run `customElements.define()` before encapsulated styles are applied along with the rest of the shadow DOM. This can cause an ugly flash of unstyled content (FOUC) that is easily remedied by pre-styling the registered component using `:not(:defined)` css pseudo-classes.
