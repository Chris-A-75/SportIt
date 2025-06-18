## Running the app:
to run the app, use the command ```npx expo start``` to start the web server on your computer, then use the expo go app to scan the qr code that pops up and it'll show you the app

## Services used:
1- Github & Git: Used to sync our application code together.

2- Firebase: Used for user authentication (logging in with gmail), storing user & court data in the firestore database, and for google analytics.

3- Trello: Used to make interactive to do list (its cool)

4- Node.js: Used to actually be able to run the app

# Technical details:
1- App will be developed using javascript with react native framework (so typescript)

2- Court data will be stored as json: 

```
{id: ____, name: ____, mainDisplayLocation: ____, courtPictureLink:____, hasParkingSpace:____, openFrom:____, openTo:____, phoneNumber:____, pricePerPersonDollar:____, courtTypes:[____], indoorsOrOutdoors:____, pricePerOnePersonOneAndHalfHour:____,}
```

# How to monetize?
1- Take small percentage off each booking made (cant be done in early stages of the app)

2- Letting the courts pay us a fee to be pushed to the front page of the app (and/or have a "sponsored" tag next to their name)

3- Just like toters, have a payed subscription tier where the user gets benefits, such as some percentage off every purchase made (for example 10-20% off, if the court gives us 5% of their revenue), 
