import { Component } from '@angular/core';
import {Recipe} from "../recipes.model";

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent {
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'Description', 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F44%2F2021%2F02%2F02%2Fclean-fridge-soup-2000' +
      '.jpg&q=60'),
    new Recipe('A Test Recipe 2', 'Description 2', 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F44%2F2021%2F02%2F02%2Fclean-fridge-soup-2000' +
      '.jpg&q=60')
  ];
}
