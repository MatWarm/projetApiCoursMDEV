"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//var express = require('express')
var router = express_1.default.Router();
var fs = require('fs');
const axios = require('axios');
const url = 'B:\\Cours mdev\\DEV WEB authentification\\Projet API\\data\\data.json';
function getData(url) {
    try {
        const data = fs.readFileSync(url, 'utf8');
        return JSON.parse(data);
    }
    catch (error) {
        console.error('Erreur lors de la lecture du fichier JSON :', error);
        // @ts-ignore
        return null;
    }
}
function callExternalAPI() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Remplacez l'URL par l'URL de l'API externe que vous souhaitez appeler
            const apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
            // Utilisez axios pour effectuer la requête GET
            const response = yield axios.get(apiUrl);
            // Traitez les données de la réponse ici
            const data = response.data;
            return data;
        }
        catch (error) {
            console.error('Erreur lors de l\'appel à l\'API externe :', error);
            throw error;
        }
    });
}
/* GET users listing. */
router.get('/', function (req, res, next) {
    const jsonData = getData(url);
    if (jsonData) {
        res.json(jsonData);
    }
    else {
        res.status(500).send('Erreur lors de la lecture du fichier JSON');
    }
});
router.get('/commandeCocktail/', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const cocktailStock = getData(url);
        const demandeClient = yield callExternalAPI();
        if (cocktailStock && demandeClient != undefined) {
            const nomBoisson = demandeClient.drinks[0].strDrink;
            const matchingCocktail = cocktailStock.find(cocktail => cocktail.nom === nomBoisson);
            if (matchingCocktail) {
                res.json("C'est un " + matchingCocktail + " qui part");
            }
            else {
                res.json("J'ai plus de stock");
            }
        }
        else {
            const codeErreur = 500;
            res.status(codeErreur).send('Erreur lors de la lecture du fichier JSON');
        }
    });
});
module.exports = router;
