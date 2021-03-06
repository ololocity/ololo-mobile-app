# ololo Mobile App

An app to help users find interesting Events in [ololohaus](http://ololo.city/), register to them, leave feedback and connect with other visitors.

[Design in Figma](https://www.figma.com/file/aobEccw8dYCQiFu7SvpoK9/05-%7C-%D0%91%D0%B0%D0%B7%D0%BE%D0%B2%D1%8B%D0%B9-UI-(Ololo-App)?node-id=0%3A1)

## Technologies

[React Native](https://facebook.github.io/react-native/) with [Expo](https://expo.io/) is used to implement most of the features for both plaforms: iOS and Android.

[Typescript](https://www.typescriptlang.org/) is used to add static typing and [Prettier](https://prettier.io/) is applied automatically to every PR  to make formatting consistent.

## Getting started

To run the project locally, the recommended approach is to use [Expo CLI](https://docs.expo.io/versions/latest/workflow/expo-cli/). If you don't have it installed run `npm install -g expo-cli` to install it globally.

Create `.env` file in the project root, containing required env-specific variables:

```
API_ENDPOINT_URL=
API_AUTH_TOKEN=
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_DATABASE_URL=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FACEBOOK_APP_ID=
```

Then, run the following commands in the project directory:

```
$ npm install
$ expo start
```

## Contributing

Create a PR, if you'd like to fix a bug, or submit a new functionality. Please, write detailed description of your changes and attach screenshots or animated gifs, if changes are visual.
