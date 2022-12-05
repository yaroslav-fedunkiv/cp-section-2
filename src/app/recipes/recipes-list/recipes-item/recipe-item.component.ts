import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../recipes.model";

@Component({
  selector: 'app-resipes-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit{
  @Input() recipe: Recipe;
  @Input() index: number;

  ngOnInit() {
  }
}
