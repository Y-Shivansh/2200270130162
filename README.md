# URL Shortener Project

hi this is my url shortener project!! 😊

## what it does
- makes long urls short
- you can click short url and go to original website
- tracks how many people clicked
- urls expire after some time

## how to run
1. install nodejs first
2. go to Backend Test Submission folder
3. run `npm install`
4. run `npm run dev`
5. server will start on port 3000

## endpoints
- POST /shorturls - to make short url
- GET /shorturls/:shortcode - to see stats
- GET /:shortcode - redirects to original url

## example
send POST request to http://localhost:3000/shorturls with:
```json
{
  "url": "https://www.google.com",
  "validity": 30
}
```

you will get back:
```json
{
  "shortLink": "http://localhost:3000/abc123",
  "expiry": "2025-07-15T12:30:00.000Z"
}
```

## database
using mongodb to store urls and click data

## files structure
- server.js - starts the server
- app.js - main express app
- routes/ - api routes
- controllers/ - business logic
- model/ - database schema
- utils/ - helper functions
- Logging Middleware/ - logs all requests

## notes
- urls expire after validity time (default 30 minutes)
- shortcode is randomly generated 6 character string
- tracks clicks with timestamp and referrer
- proper error handling for expired urls

thats it! simple url shortener made with nodejs and mongodb 🚀

## requirements
- nodejs
- mongodb
- express
- mongoose
- nanoid for generating short codes
