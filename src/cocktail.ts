import fs from "fs";
import { Cocktail } from "./types";

export function getData(url: string): Array<Cocktail> | null {
  try {
    const data = fs.readFileSync(url, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Erreur lors de la lecture du fichier JSON :", error);
    // @ts-ignore
    return null;
  }
}

export async function callExternalAPI(): Promise<any | null> {
  try {
    // Remplacez l'URL par l'URL de l'API externe que vous souhaitez appeler
    const apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

    // Utilisez axios pour effectuer la requête GET
    const data = await fetch(apiUrl);

    return data;
  } catch (error) {
    console.error("Erreur lors de l'appel à l'API externe :", error);
    return null;
  }
}
