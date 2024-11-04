## About
A little project where you can favourite star wars films and characters, and then read about their details in the profile page.
- Core Features:
  - Characters Tab
  - Films Tab
  - Favouritable Cards
  - Profile Page
	  - Edit User Details
	  - View Favourited Cards
	  - Read Card Description
	
Requirements:
- MongoDB Server
- Recaptcha Secret Key for localhost

## Built using:
- React/ Vite
- Express.js
- Node.js
- MongoDB
## How To Run
- clone the repo
- run npm i in both backend and frontend directories.
- Then make sure to add a .env to both the backend and frontend directories.
- The backend .env will need to have a database connection URI and a port
-  it should look something like this:

`URI="{mongodb connection string}"`
`PORT=3000`

- make sure to change the `vite.config.js` proxy `/api` to the port you entered into the backend .env.
- The frontend .env needs to contain your reCaptcha key

`VITE_APP_SITE_KEY={recaptchakey}
`
- Now it should be ready to run the populate.
- start up the backend with `npm run dev` and open up a terminal to 
- curl or some form of querying software.
- Run this curl to populate the database: `curl -X POST http://localhost:{port}/api/setter`

Once done, it is now ready to use! Enjoy!

### Contributors
- matezalantoth
- blameaimer
