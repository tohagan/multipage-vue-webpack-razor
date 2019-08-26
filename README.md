# Multi-page Vue/Webpack build to generate Head & Body partials for a legacy ASP.NET Razor layout.

I'm attempting to add VueJS into a legacy ASP.NET app. To this I wish to use Razor's @Html.Partial() method to inject the CSS and JS files generated by Vue's webpack into the Header and Body of an existing and a complex Razor layout template file used on every page in the legacy app.

To support multiple webpack entry points (mult-page) we're using the pages feature of Vue CLI v3 with the following vue.config.js file to goal to generate vendor, common and app webpack chunks.

### How this project was setup

To setup this test project we used Vue CLI v3, added Quasar as a plugin and then created `vue.config.js` to generate a multi-page webpack build.   Finally we've made various attempts to create a webpack template that can generate the requied ASP.NET/Razor partial HTML for inserting into a legacy ASP.NET app _Layout.html file.

**These instructions are only included as background to understand how this project was setup.**

Install Vue 3 CLI:

    $ npm install -g @vue/cli       (Remove older Vue 2)

Install Quasar 1.0 (not essential but may influence the build)

    $ npm install -g @quasar/cli    (Remove older Quasasr `npm uninstall -g quasar-cli` first)

Create initial Vue/Quasar project 

    $ vue create multipage-vue-webpack-razor
    $ cd multipage-vue-webpack-razor
    $ vue add quasar

Create multiple example Vue Apps (each being a new webpack entry point) under: 

     - src/apps/App1/main.ts
     - src/apps/App2/main.ts    

Created `vue.config.js` to that inspects the `src/apps/*` to configure the apps as vue/webpack `pages`. 
    - Refer to code in `vue.config.js`
  
Created test webpack templates `index.razor1.ejs` ... `index.razor3.ejs` to attempt to generate Razor HTML partials.

The final `_Layout.html` file (not included)  would look something like:

```cshtml
@using Microsoft.AspNet.Identity
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
  <title>@(ViewBag.WindowTitle != null ? ViewBag.WindowTitle + " - " : ViewBag.Title != null ? ViewBag.Title + " - " : "")Esperance</title>

  @Styles.Render("~/bundles/css")
  @RenderSection("styles", false)
  @Scripts.Render("~/bundles/jquery")
  @Scripts.Render("~/bundles/bootstrap")
  ...
  @if (ViewBag.VueApp != null)
  {
    @Html.Partial("some/path/dist/" + ViewBag.VueApp + ".html", true);
  }
  ...
</head>
<body>

  ...
  @if (ViewBag.VueApp != null)
  {
    @Html.Partial("some/path/dist/" + ViewBag.VueApp + ".html", false);
  }

  ...

</body>
</html>

```
         

## Install this project 

```
yarn install
```

### Commands

To check the webpack configuration generated by Vue + Quasar + vue.config.js ...

    $ yarn run inspect > webpack-config-generated.js    

Build...  `dist/` folder:

    $ yarn run build

Output: 
    - dist/App1.html  - page 1
    - dist/App2.html  - page 2s

### Reference

- [Vue CLI Configuration Reference](https://cli.vuejs.org/config/).
  - [Vue CLI Pages feature](https://cli.vuejs.org/config/#pages)
- [HTML Webpack Plugin](https://github.com/jantimon/html-webpack-plugin)
