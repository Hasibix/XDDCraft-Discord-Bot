# XDDCraft | Official Discord Bot
- Special thanks to GhostGennix, Manav Garg, FirezTheGreat, Reconlx, SudhanPlayz, ghaku, Codelyon and others!

This is our offical discord bot source code. If you want, you can use this code to make your own bot! To use this source code first we recommend to use replit if you want to host it 24/7 or you can also use heroku! If you want to host it in your dedicated machine or your own computer, download this code and extract it in a folder. Then make a file named `.env` using comamnd. Then put this in your `.env` file:
```
BOT_TOKEN=YOUR_BOT_TOKEN_GOES_HERE
MONGO_DB=YOUR_MONGO_DB_URI_GOES_HERE
GOOGLE_API=YOUR_YOUTUBE_API_KEY_GOES_HERE
```
Then simply run `npm install` then run `npm start` and your bot is ready! You can change status by changing `events/ready.js` code. To change the prefix, go to `config.json` and change `"prefix": "XDD",` to `"prefix": "YOUR-PREFIX",` and its done! Again, special thanks to GhostGennix, Manav Garg, FirezTheGreat, Reconlx, SudhanPlayz, ghaku, Codelyon and others!