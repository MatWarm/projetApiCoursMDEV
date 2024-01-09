import fs from "fs";
import { Cocktail, CocktailApiResponse } from "./types";

export function getData(url: string): Array<Cocktail> | null {
  try {
    const data = fs.readFileSync(url, "utf8");
    const json = JSON.parse(data);
    return json.cocktails;
  } catch (error) {
    console.error("Erreur lors de la lecture du fichier JSON :", error);
    return null;
  }
}

export async function callExternalAPI(): Promise<any | null> {
  try {
    const apiUrl: string = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
    const response = await fetch(apiUrl);
    const data: CocktailApiResponse = await response.json();
    return data.drinks[0];
  } catch (error) {
    console.error("Erreur lors de l'appel à l'API externe :", error);
    return null;
  }
}
