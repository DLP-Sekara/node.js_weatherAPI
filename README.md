# Weather Data Management API
## Overview
The Weather Data Management API is a Node.js application designed to store and retrieve weather data for users. It integrates with the OpenWeatherMap API to fetch real-time weather information based on user locations. This project includes functionalities such as user registration, location updates, and the retrieval of weather data for a given day.
## Requirements
   * Node.js
   * MongoDB
   * OpenWeatherMap API 
## Setup
1. Clone the repository:
> git clone https://github.com/yourusername/weather-data-api.git

2. Install dependencies:
> cd weather-data-api

> npm install

3. Set up environment variables:
> MONOGO_db=your_mongodb_connection_username

> MONGO_PASSWORD=your_mongodb_connection_password

> OPENWEATHERMAP_API_KEY=your_openweathermap_api_key

> API_ID=your_openweathermap_app_id
4. Start the application:
> npm start

## API Endpoints
  * POST /register: Register a new user.
  * POST /updateLocation: Update user location.
  * GET /getUser: Get all users.
  * GET /getUserWeather: Get user weather data for a given day.

    To check each endpoint, refer to the [Postman API Collection]().
