# Star Wars Favourites Project

## About
A small project where you can favourite Star Wars films and characters, and then read about their details on the profile page.

### Core Features:
- Characters Tab
- Films Tab
- Favouritable Cards
- Profile Page
  - Edit User Details
  - View Favourited Cards
  - Read Card Description

## Requirements:
- MongoDB Server
- reCaptcha Secret Key for localhost

## Built using:
- React/ Vite
- Express.js
- Node.js
- MongoDB

## How To Run

1. Clone the repo.
2. Run `npm i` in both the `backend` and `frontend` directories.

3. Add a `.env` file to both the `backend` and `frontend` directories.

   - **Backend `.env`** should include the database connection URI and a port. It should look something like this:
     ```plaintext
     URI="{mongodb connection string}"
     PORT=3000
     ```
   - Be sure to change the `vite.config.js` proxy `/api` to match the port you entered in the backend `.env`.

   - **Frontend `.env`** needs to contain your reCaptcha key:
     ```plaintext
     VITE_APP_SITE_KEY={recaptchakey}
     ```

4. Now it should be ready to run the populate.

5. Start up the backend:
    ```bash
    npm run dev
    ```
6. Open up a terminal to use `curl` or any other querying software.

7. Run this `curl` command to populate the database:
    ```bash
    curl -X POST http://localhost:{port}/api/setter
    ```

8. Once done, it is now ready to use! Enjoy!

## Contributors
- matezalantoth
- blameaimer
