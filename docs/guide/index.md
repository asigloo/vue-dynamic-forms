# Introduction

Vue Dynamic Forms (a.k.a vdf) is a lighweight [Vue 3x](https://v3.vuejs.org/) plugin to easily create dynamic forms.

## Why VDF?

Implementing handcrafted forms can be:

- Costly 💰 🔥
- Time-consuming 😅 ⏱

Especially if you need to create a very large form, in which the inputs are similar to each other, and they change frequently to meet rapidly changing business and regulatory requirements.

So, wouldn't it be more economical to create the forms dynamically? Based on metadata that describes the business object model?

That's **Vue Dynamic Forms**.

## Features

- ✓ UI Framework agnostic (Bootstrap, material, tailwindcss?) You choose.
- ✓ Dx (Developer Experience) oriented, forget about those infintie form templates, only one component to use. [./components/dynamic-form]
- ✓ Full [Typescript](https://www.typescriptlang.org/) Support
- ✓ Supports both [Options API](https://v3.vuejs.org/api/options-api.html) and [Composition API](https://v3.vuejs.org/guide/composition-api-introduction.html)
- ✓ Ridicously lightweight ([~26.3 kB minified - 6.7 kb Gzipped](https://bundlephobia.com/package/@asigloo/vue-dynamic-forms@latest))
- ✓ Tree-Shakeable
- ✓ Completly accessible [AA](https://www.w3.org/WAI/WCAG2AA-Conformance)

## Vue 2.x

::: warning
This version doesn't support Vue [2.x.x](https://github.com/alvarosaburido/vue-dynamic-forms/tree/2.x) anymore since there aren't new feature request or issues opened. I decided to drop the support and focus on the development and mantainance of the main current [v3.x](https://github.com/alvarosaburido/vue-dynamic-forms).
:::

If you still want to use this plugin on Vue `2.x` please use the library tags [2.x](https://github.com/alvarosaburido/vue-dynamic-forms/tree/2.x).

## Why Not ...?

Are there more Vue Forms alternatives? Of course they are, hovewer, I was motivated to create this library because none of those allowed to easily create forms without caring about creating the different input components and handling the events etc. Most of them offer a mixed solution with schemas and your own input components, but you still need to do everything pretty much manually.

If you want a ready to go solution based on a javascript/JSON metadata object containing your form fields. [Vue Dynamic Forms](https://github.com/asigloo/vue-dynamic-forms) is the solution you're looking for.

### Vue Formulate

Vue Formulate is a very good library that brings a lot of different funcionalities and features, however, Vue Formulate don't support Vue3 at the moment [Check here](https://github.com/wearebraid/vue-formulate/issues/198) and current version weights 3x more than VDF. [Check here](https://bundlephobia.com/package/@braid/vue-formulate@2.5.2)

### FormVueLate

FormVueLate is an amazing library that allows you to generate schema-driven forms with extreme ease. This is similar of what VDF offers.

They do support Vue3, a downside would be that FormVueLate is that hey don't have a built-in solution for validations, you will need to add a vee-validate plugin to support them.

Apart from that the main difference between FormVueLate and VDF is pretty much highlighted in their docs:

> FormVueLate is a bring-your-own-components library! We do not provide any base components for your to build your forms. There are numerous component libraries out there that do a great job of providing carefully constructed components for you to use, and FormVueLate does a great job at allowing you to bring those external components to your forms, or even crafting your own.

### Vuetify

Vuetify is full UI framework which includes forms as one of their features but is not a specific library dedicated to it-
