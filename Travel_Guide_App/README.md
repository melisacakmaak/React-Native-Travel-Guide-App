

## How to use?

1. Download or clone this repo.

2. Install dependencies.

```js
npm install --save firebase@^7.9.0
npm install
// or
yarn install
```

3. Go to `src/core/config.js` and replace `FIREBASE_CONFIG` with your own firebase config.

```js
export const FIREBASE_CONFIG = {
  apiKey: 'xxx-yyy-zzz', // etc.
  // rest of your firebase config
}
```
3. Go to `/GoogleMapAPI.js` and replace `API_KEY` with your own Google Places API config.

```js
let API_ENDPOINT = 'https://maps.googleapis.com/maps/api/place',
    API_KEY = 'XXXXXX';
```

4. Run project on iOS / Android.

```js
 
expo start 
 
a - run android// npm run android
```
