## Running the app:
to run the app, use the command ```npx expo start``` to start the web server on your computer, then use the expo go app to scan the qr code that pops up and it'll show you the app

## Services used:
1- Github & Git: Used to sync our application code together.

2- Firebase: Used for user authentication (logging in with gmail), storing user & court data in the firestore database, and for google analytics.

3- Trello: Used to make interactive to do list and shit (its cool)

4- Node.js: Used to actually be able to run the app

# Technical details:
1- App will be developed using javascript with react native framework (so typescript)

2- Court data will be stored as json: 

```
{id: ____, name: ____, mainDisplayLocation: ____, detailedLocation:____, courtPictureLink:____, hasParkingSpace:____, openFrom:____, openTo:____, phoneNumber:____, pricePerPersonDollar:____, pricePerPersonLBP:____, courtType:____, indoorsOrOutdoors:____, pricePerOnePersonHalfHour:____,}
```