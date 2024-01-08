var express = require('express');
var router = express.Router();
var fs = require('fs');
const axios = require('axios');

const url = 'B:\\Cours mdev\\DEV WEB authentification\\Projet API\\data\\data.json';

function getData(url) {
    try {
        const data = fs.readFileSync(url, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Erreur lors de la lecture du fichier JSON :', error);
        return null;
    }
}


async function callExternalAPI() {
    try {
        // Remplacez l'URL par l'URL de l'API externe que vous souhaitez appeler
        const apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

        // Utilisez axios pour effectuer la requête GET
        const response = await axios.get(apiUrl);

        // Traitez les données de la réponse ici
        const data = response.data;

        return data;
    } catch (error) {
        console.error('Erreur lors de l\'appel à l\'API externe :', error);
        throw error;
    }
}

/* GET users listing. */
router.get('/', function(req, res, next) {
    const jsonData = getData(url);
    if (jsonData) {
        res.json(jsonData);
    } else {
        res.status(500).send('Erreur lors de la lecture du fichier JSON');
    }
});


router.get('/commandeCocktail/',async function(req , res ,){
    const cocktailStock = getData(url);
     const demandeClient = await callExternalAPI()

    if(cocktailStock && demandeClient != undefined){
        const nomBoisson = demandeClient.drinks[0].strDrink
        const matchingCocktail = cocktailStock.cocktails.find(cocktail => cocktail.nom === nomBoisson );
        if (matchingCocktail) {
            res.json("C'est un " + matchingCocktail + " qui part");
        } else {
            res.json("J'ai plus de stock");
        }
    } else {
        res.status(500).send('Erreur lors de la lecture du fichier JSON');
    }
})


module.exports = router;