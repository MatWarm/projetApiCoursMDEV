// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { callExternalAPI, getData } from "./cocktail";
import { Cocktail, DrinkDetails } from "./types";

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
  const cocktails: Array<Cocktail> | null = getData(dataPath);
  const customerOrder: DrinkDetails | null = await callExternalAPI();
  if (cocktails && customerOrder) {
    const matchingCocktail = cocktails.find(
      (cocktail) => cocktail.nom === customerOrder.strDrink
    );
    if (matchingCocktail) {
      res.json("C'est un " + matchingCocktail.nom + " qui part");
    } else {
      res.json("J'ai plus de stock");
    }
  } else {
    res.status(500).send("Erreur lors de la lecture du fichier JSON");
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
