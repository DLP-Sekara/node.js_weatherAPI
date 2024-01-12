export interface WeatherDataInterface {
  date: Date;
  time: string;
  city: string;
  temperature: number;
  weatherStatus: string;
  humidity: number;
  windSpeed: number;
  feels_like: string;
}

export interface userDetailInterface {
  email: string;
  location: string;
  weatherData: [WeatherDataInterface];
}

export interface userWeatherRepotCredentials {
  email: string;
  date: string;
}

export interface updateDataBody {
  _id: string;
  email: string;
  location: string;
}

export interface weatherDataCredentials {
  id: string;
  location: string;
}