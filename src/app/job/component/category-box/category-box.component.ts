import { Component, OnInit, Input } from '@angular/core';
import { CategoriesCount } from 'src/app/core/models/categories-count-response.model';

@Component({
  selector: 'sp-category-box',
  templateUrl: './category-box.component.html',
  styleUrls: ['./category-box.component.scss']
})
export class CategoryBoxComponent implements OnInit {

  @Input() categoriesCount: CategoriesCount;
  
  constructor() { }

  ngOnInit() {
  }

}
