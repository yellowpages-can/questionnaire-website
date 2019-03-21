# Yellow Pages Website Questionnaire

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

For extensive Vue.js documentation, check out their [official guide](https://vuejs.org/).


## Locations

Production files: `/docs/`

Base HTML: `/index.html`

Entry point: `/src/main.js`

Components: `/src/components/`

App strings: `/static/translations/`

Central store: `/src/store/`

CSS and images: `/static/` and `/static/uploads/`

Mail endpoint: https://ehost-services229.com


## Processes

### Adding a new question
1. Update `/store/modules/field` with new field in correct section object
2. Update `/store/modules/error` if question is required
2. Update JSON file of that section with question string(s) and answers array if needed (both languages)
3. Update template of that section's component

### Updating styling
1. Update `/static/main.css`
2. Copy entire file into Mono's global CSS


## Outstanding Todos
- Reactively clear old products/services from store
