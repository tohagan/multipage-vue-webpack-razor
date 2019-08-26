To setup a Vue/Quasar build for multiple entry points (an app per page)

0. install Vue 3

  $ npm install -g @vue/cli

1. Create a new project using @vue/cli (Vue3)
   
2. Add as Quasar a plug in ( https://quasar.dev/start/vue-cli-plugin)
- Enable Quasar tree-shaking (recommended) 
  
1. Configure Vue 3 to generate multiple pages using multi page mode https://cli.vuejs.org/config/#pages
- Generates a separate HTML page that references generated tree-shaken JS files for each entry point.
  
1. Add each generated HTML page as part of a Razor View (cshtml).
- ViewBag values can be passed into the Vue page component as data via a global if needed (we may find a better way)

Versions:
- Vue 3.10.0
- Quasar 1.0.5

## Project Setup Commands & Options

$ vue create app // Manually selected fetaures
  - Selected: Babel, TyepeScript, Router, Vuex, CSS Pre-processor, Linter, Unit Testing
  - Not selected: PWA support(not reqd), E2E Testing (installer not working)
  - Router History mode: NO
  - CSS Pre-processor: Stylus
  - Lint: TSLint, Lint on Save
  - Unit test: Jest
  - Dedicated config files for Babel, CSS, Lint etc

$ vue add quasar
 - Allow Quasar to replace App.vue, About.vue, Home.vue and router.js: YES
 - Treeshake Quasar (You'll need to import components, directives and plugins): YES   - Not sure this is best option
 - RTL Support: NO
 - Quasar Icon Set: Fontawesome (because Esperance already uses them)
 - Language: en-us
 - Features: Roboto font, Fontawesome  (NOT IE11 support - possible required if we use with customers)

## Build

Use Vue's [CLI Service](https://cli.vuejs.org/guide/#cli-service) to run the web pack builder.
It's referenced by the "serve" and "build" scripts in `package.json`:

```json
{
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build"
  }
}
```
