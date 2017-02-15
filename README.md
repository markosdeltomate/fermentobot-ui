# BeerBotJS
[ ![Codeship Status for bifemecanico/app.masbirra.com.ar](https://app.codeship.com/projects/df104030-f2d9-0133-d508-16a4a456a383/status?branch=master)](https://app.codeship.com/projects/149609)

WebApp seed project.

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node ^5.9.1, npm ^3.8.1
- [SASS](sass-lan.com) Sass ^3.5, Ruby ^2.0.0 (`gem install sass`)
- [Karma](http://gruntjs.com/) (`npm install --global karma-cli`)
- [JSPM](http://jspm.io/) (`npm install --global jspm`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`

### Developing

1. Run `npm install` to install server dependencies.

2. Run `jspm install` to install front-end dependencies.

3. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

4. Run `npm run build:dev` to build the app locally.

5. Run `npm run start:dev` to start the development server. It will automatically open the client in your browser, watch for file changes, rebuild and reload the browser.

## Build & dev deployment

Run `npm run build:all` for building server, client and increasing the patch version.

## Unit Testing

Running `npm test` will run the unit tests with karma.

_Created by [Marcos Tomatti](mailto:marcos@birra.com.ar)_