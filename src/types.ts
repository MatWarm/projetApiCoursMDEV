export interface Ingredients {
  nom: string;
  quantite: string;
}

export interface Cocktail {
  nom: string;
  ingredients: Array<Ingredients>;
  instructions: string;
}
