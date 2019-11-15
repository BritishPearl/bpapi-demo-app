British Pearl API Demo
======================

This is a simple project demonstrating how to connect to British Pearl API and make authorized requests to retrieve user's data.

The project consists of a backend Node.js application and a frontend React application, both written in Typescript.

You can run the applications in three ways:

* locally via `yarn` commands
* locally via `docker-compose`
* remotely on Heroku using Heroku CLI


## Running the apps locally using yarn

### Backend

```bash
cd backend
yarn install
BPAPI_CLIENT_ID=xxx BPAPI_CLIENT_SECRET=yyy BPAPI_REDIRECT_URI=http://example.com yarn start
```

### Frontend

```bash
cd frontend
yarn install
yarn start
```

You can view the frontend app in the browser under http://localhost:3000.

## Running the apps locally using Docker Compose

Copy environment variables definition file required for `docker-compose` command.

```bash
cp demo.env .env
```

Edit the `.env` files to reflect your desired configuration.

```bash
docker-compose up --build -d
```

You can view the frontend app in the browser under http://localhost:3000.


## Deploying onto Heroku

### Heroku authentication

```bash
heroku login
heroku container:login
```

### Backend

```bash
heroku create YOUR_BACKEND_APP_NAME
heroku config:set --app=YOUR_BACKEND_APP_NAME \
    BPAPI_CLIENT_ID="---Please request this from British Pearl" \
    BPAPI_CLIENT_SECRET="---Please request this from British Pearl" \
    BPAPI_REDIRECT_URI="https://YOUR_FRONTEND_APP_NAME.herokuapp.com/cb-bpapi"
cd backend/
heroku container:push web --app=YOUR_BACKEND_APP_NAME
heroku container:release web --app=YOUR_BACKEND_APP_NAME
```

You can verify the app is running by viewing logs:

```bash
heroku logs --tail --app=YOUR_BACKEND_APP_NAME
```

### Frontend

```bash
heroku create YOUR_FRONTEND_APP_NAME
heroku config:set --app=YOUR_FRONTEND_APP_NAME INTERNAL_API_URL="https://YOUR_BACKEND_APP_NAME.herokuapp.com"
cd frontend/
heroku container:push web --app=YOUR_FRONTEND_APP_NAME
heroku container:release web --app=YOUR_FRONTEND_APP_NAME
```

You can verify the app is running by viewing logs:

```bash
heroku logs --tail --app=YOUR_FRONTEND_APP_NAME
```

### reCAPTCHA

You can also optionally enable Google reCAPTCHA by setting proper environment variables in the backend and frontend app.

```bash
heroku config:set --app YOUR_BACKEND_APP_NAME GOOGLE_RECAPTCHA_SECRET_KEY="YOUR SECRET KEY"
heroku config:set --app YOUR_FRONTEND_APP_NAME REACT_APP_GOOGLE_SITE_KEY="YOUR SITE KEY"
```
