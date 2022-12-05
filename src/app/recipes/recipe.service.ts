import {Recipe} from "./recipes.model";

export class RecipeService{
  private recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'Description', 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F44%2F2021%2F02%2F02%2Fclean-fridge-soup-2000' +
      '.jpg&q=60'),
    new Recipe('Another recipe', 'Description 2', 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F44%2F2021%2F02%2F02%2Fclean-fridge-soup-2000' +
      '.jpg&q=60')
  ];

  getRecipes(){
    return this.recipes.slice();
  }

}
