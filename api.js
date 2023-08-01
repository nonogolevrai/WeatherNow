// Fichier api.js pour gérer les appels à l'API météo et le traitement des données

// Vous pouvez insérer ici le code pour appeler l'API météo de votre choix.
// Assurez-vous de gérer les paramètres d'authentification si nécessaire.

// Exemple d'appel d'API avec Fetch API :
async function callWeatherAPI(location) {
    const apiKey = '0e2454364ebb4241b59212132233107'; // Remplacez par votre clé d'API météo
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Une erreur s\'est produite lors de l\'appel à l\'API météo :', error);
      throw error;
    }
  }
  