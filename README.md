<h1>
  Welcome to my portfolio!
  <img src="src/assets/leaf-logo.png" style="height: 0.8em;"/>
</h1>

You probably want to [click here](https://todoran.dev/) to go to the actual website. This readme simply consists of random tidbits and notes to myself related to the development process for the website and probably isn't very interesting, but you can read it if you like.

## Tech Stack

* Vite + TypeScript + React + SASS
* Design: Figma, paint.net, Blender
* Analytics & Contact Form: Firebase
* Hosting: GitHub Pages
* Scripts: Node.js, fs-extra

## Getting Started

```
npm i
npm run dev
```

## Useful Scripts

### `npm run dev`

Starts the development server, exposing the website at http://localhost:5173/.

### `npm run build`
### `npm run preview`

Allows previewing of the website build, exposed at http://localhost:4173/.

### `npm run deploy`

Bumps the npm package version, builds the application with vite, copies the build to `/docs/`, then commits and pushes changes.

## TODO

* The project descriptions for Technivision and Linguini are cool, but kindof out of nowhere. Overall the site flow is due for a revamp. The work with me section at the end could also stand to come earlier.

* The site still loads in pretty slow, even with the minification, so looking in to cutting some of the image sizes and perhaps some other compresion could help.

* The plant decorations look cool but I want the jungle to feel alive! Consider potential methods for giving the plants some subtle swaying in the wind animations. The falling leaves should be blown by the wind in a synchronized way with this too.

## Known Issues

In firefox (not an issue in chrome, need to check safari) sometimes if your mouse is within the bounding box of a parallax section during the animation, it just becomes invisible and stays that way. Seems to be a bug in firefox's implementation of CSS animations, but I haven't been able to find a workaround as opening the inspector fixes the issue.