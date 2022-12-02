import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Recipe} from "../../recipes.model";

@Component({
  selector: 'app-resipes-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;
  @Output() recipeSelected = new EventEmitter<void>();

  onSelected(){
    this.recipeSelected.emit();
  }
}
