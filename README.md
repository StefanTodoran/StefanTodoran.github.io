<h1>
  Welcome to my portfolio website! 
  <img src="src/assets/leaf-logo.png" style="height: 0.8em;"/>
</h1>

You probably want to [click here](https://todoran.dev/) to go to the actual website. This readme simply consists of random tidbits and notes to myself related to the development process for the website and probably isn't very interesting, but you can read it if you like.

# Development Instructions

## Getting Started

```
npm i
npm run dev
```

## Useful Scripts

### `npm run dev`

Starts the development server, exposing the website at http://localhost:5173/.

### `npm run build`

### `npm run deploy`

Bumps the npm package version, builds the application with vite, then commits and pushes changes.

## TODO

* The website needs a proper contact feature, not just a `mailto` link. Easiest way to set this up would probably be firebase.

* Modify the python server and index.js to allow auto refresh when files are changed.

* For some reason, the minifier used in `build.js` is unable to pass options to its css minifying dependency, and the documentation is unclear. It seems to be encoding background-image properties from css to base64, which is an odd default behavior for a supposed "minifier"...

* The site still loads in pretty slow, even with the minification, so looking in to cutting some of the image sizes and perhaps some other compresion could help.

* The plant decorations look cool but I want the jungle to feel alive! Consider potential methods for giving the plants some subtle swaying in the wind animations. At the same time, the plant decorations are a bit visually busy, so some way to make them less distracting could help.

## Known Issues

In firefox (not an issue in chrome, need to check safari) sometimes if your mouse is within the bounding box of a parallax section during the animation, it just becomes invisible and stays that way. Seems to be an issue with firefox and animations, but I haven't been able to find a workaround as opening the inspector fixes the issue.