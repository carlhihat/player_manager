# player_manager
#### 😎 The ultimate Player Manager tool for all your player management needs! 😎 

### Guide
#### All components written by me can be found in the ```components``` directory and the ```tests``` directory. The rest is boilerplate

### Quickplay
#### Open the file```dist/index.html``` with your favorite web-browser.

### Slowplay
```
npm install
npm run serve
```
### Testing
#### There is a simple jest-test for testing the player-component.
```
npm run test:unit
```

### Limitations
#### You might stumble upon CORS-errors in the backend when deleting players. If you do, edit ```allowCorsMiddleware()``` to:

```
function allowCorsMiddleware(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); //Fix?
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}
```
#### This project has only been tested on a windows pc. CSS-animations might flicker on iOS-devices.

