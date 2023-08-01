// Fichier script.js pour gérer les interactions du site WeatherNow

const form = document.getElementById("weatherForm");
const weatherDataDiv = document.getElementById("weatherData");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = document.getElementById("location").value;
  fetchWeatherData(location);
});

async function fetchWeatherData(location) {
  try {
    // Appel à l'API météo et traitement des données
    const weatherData = await callWeatherAPI(location);

    // Traduction des conditions climatiques en français
    const translatedWeatherData = translateWeatherData(weatherData);

    // Affichage des résultats dans weatherDataDiv
    weatherDataDiv.innerHTML = `
      <h2>Météo à ${translatedWeatherData.location.name}, ${translatedWeatherData.location.country}</h2>
      <p>Température actuelle : ${translatedWeatherData.current.temp_c} °C</p>
      <p>Conditions climatiques : ${translatedWeatherData.condition_fr}</p>
      <p>Humidité : ${translatedWeatherData.current.humidity} %</p>
      <p>Vitesse du vent : ${translatedWeatherData.current.wind_kph} km/h</p>
    `;
  } catch (error) {
    console.error('Une erreur s\'est produite lors de l\'appel à l\'API météo :', error);
    weatherDataDiv.innerHTML = `<p>Une erreur s'est produite lors de la récupération des données météo.</p>`;
  }
}

function translateWeatherData(weatherData) {
  // Dictionnaire de traduction des conditions climatiques en français
  const weatherTranslations = {
    "Clear": "Dégagé",
    "Partly cloudy": "Partiellement nuageux",
    "Cloudy": "Nuageux",
    "Overcast": "Couvert",
    "Mist": "Brume",
    "Fog": "Brouillard",
    "Light rain shower": "Légères averses de pluie",
    "Moderate or heavy rain shower": "Averses de pluie modérées ou fortes",
    "Light rain": "Pluie légère",
    "Moderate rain": "Pluie modérée",
    "Heavy rain": "Pluie forte",
    "Patchy light rain": "Pluie légère éparses",
    "Patchy moderate rain": "Pluie modérée éparses",
    "Patchy heavy rain": "Pluie forte éparses",
    "Light snow": "Neige légère",
    "Moderate snow": "Neige modérée",
    "Heavy snow": "Neige forte",
    "Patchy light snow": "Neige légère éparses",
    "Patchy moderate snow": "Neige modérée éparses",
    "Patchy heavy snow": "Neige forte éparses",
    "Light sleet": "Grésil léger",
    "Moderate or heavy sleet": "Grésil modéré ou fort",
    "Patchy light sleet": "Grésil léger épars",
    "Patchy moderate or heavy sleet": "Grésil modéré ou fort épars",
    "Thundery outbreaks": "Orages",
    "Blowing snow": "Neige soufflée",
    "Blizzard": "Blizzard",
    "Fog": "Brouillard",
    "Freezing fog": "Brouillard givrant",
    "Patchy light rain with thunder": "Légères averses de pluie avec tonnerre",
    "Moderate or heavy rain with thunder": "Averses de pluie modérées ou fortes avec tonnerre",
    "Patchy light snow with thunder": "Légères averses de neige avec tonnerre",
    "Moderate or heavy snow with thunder": "Averses de neige modérées ou fortes avec tonnerre",
    // Ajoutez d'autres traductions ici en fonction de vos besoins
  };


  // Vérifiez si la condition climatique est dans le dictionnaire de traduction
  if (weatherTranslations.hasOwnProperty(weatherData.current.condition.text)) {
    // Si la traduction existe, stockez-la dans une variable séparée
    weatherData.condition_fr = weatherTranslations[weatherData.current.condition.text];
  } else {
    // Si la traduction n'existe pas, utilisez la condition climatique en anglais par défaut
    weatherData.condition_fr = weatherData.current.condition.text;
  }

  return weatherData;
}
