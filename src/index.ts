// src/index.js
import express, { Express, Request, Response, Router } from "express";
import dotenv from "dotenv";
import { callExternalAPI, getData } from "./cocktail";
import { Cocktail } from "./types";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const dataPath = "src/data.json";

app.get("/", function (req: Request, res: Response, next: Function) {
  const jsonData: Array<Cocktail> | null = getData(dataPath);
  if (jsonData) {
    res.json(jsonData);
  } else {
    res.status(500).send("Erreur lors de la lecture du fichier JSON");
  }
});

app.get("/commandeCocktail", async function (req: Request, res: Response) {
  const cocktailStock: Array<Cocktail> | null = getData(dataPath);
  const demandeClient = await callExternalAPI();

  if (cocktailStock && demandeClient?.drinks && demandeClient.drinks.length > 0) {
    const nomBoisson = demandeClient.drinks[0].strDrink;

    const matchingCocktail = cocktailStock.find(
      (cocktail) => cocktail.nom === nomBoisson
    );
    if (matchingCocktail) {
      res.json("C'est un " + matchingCocktail + " qui part");
    } else {
      res.json("J'ai plus de stock");
    }
  } else {
    const codeErreur: number = 500;
    res.status(codeErreur).send("Erreur lors de la lecture du fichier JSON");
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
