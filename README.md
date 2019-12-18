# IPB OAuth2 NodeJS Auth
 A Base program for creating Node Apps using Invision Power Board to Authenticate users.

 Simply uses a generic Passport.js OAuth2 to authenticate with IPB and uses the returning AccessToken to make an API Call.

 Please excuse the mess that currently is the code, things were changed over and over as Passport was being finicky and so was IPB.

 This was mainly created to create a new version of the Maze Panel you can find on my repositories, originally in PHP I wanted a better way to login rather than steam, seen in the form of OAuth2 with the Forum software directly.

 ## Prerequisites

 Invision Power Board 4.3+ running on a web server, acting as the OAuth Server
 NodeJS 12.14+
 NPM to install all the requirements.
 Some Knowledge of the OAuth2 Flow

 ## Setup

 1. Start by going onto IPB and Heading to the 'REST & OAuth Tab'
 ![alt text](https://cloud.tomroman.co.uk/img/2019/12/18/89c7b518-0a1e-4993-a0fe-451697f3edc7e.png "OAuth Tab on IPB")
 2. Create a new OAuth Server, and ensure you select 'Custom Confidential OAuth Client' and tick Authorization Code and Implicit for the Available Grant Types. Customise as you wish.
 3. Under the 'Scopes' Tab, keep the first key as 'profile' and customise the desciption to how you wish. Remove any other scopes. If you delete both scopes, by accident, the API endpoint you wish to have is under 'Authorized User'. Tick Access for '/core/me'.
![alt text](https://cloud.tomroman.co.uk/img/2019/12/18/f41aad5a-0fda-4ef0-a208-84faf72f84113.png "API Endpoint")
4. On the next page fill in all of the information given into the index.js file. The Client Identifier, Client Secret, Authorization Endpoint and Token Endpoint all need to be filled out now.
5. Next Head to the API Reference Tab on IPB (under REST & OAuth) and find the tab for Authorized User and '/core/me'. Copy the URL at the top and paste it into the uri field on line 53 of index.js
![alt text](https://cloud.tomroman.co.uk/img/2019/12/18/da7e9b67-fa8e-4cd8-86fc-03d614ddf3f78.png "API Reference URL")
6. Finally Setup the SSL Cert's etc at the bottom of index.js. A Good tutorial if you're unsure how to can be found [here](https://flaviocopes.com/express-letsencrypt-ssl/) using LetsEncrypt. HTTPS is required for OAuth2 with IPB.
7. Edit the config.json to the IPB User Groups, the Id's are the important part of this, as these are the one's checked for Authenticating.
8. Test it! It should now theoretically all work (hopefully)

## But Why?

You may ask why bother using this when you could build an Application on Google as the OAuth Server, but I felt a need to publish this, as I found very little documentation on using OAuth2 with Invision Power Board, and using it as an actual login, rather than just using the API.

If you have any issues or suggestions, please make an Issue, and if you build on it and make it more efficient, please feel free to make a PR. I designed this for people newer to OAuth2 and also express in itself.

Cheers lads