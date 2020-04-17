import { Component, OnInit, Input } from '@angular/core';
import { CategoriesCount } from 'src/app/core/models/categories-count-response.model';
import { Router } from '@angular/router';

@Component({
  selector: 'sp-category-box',
  templateUrl: './category-box.component.html',
  styleUrls: ['./category-box.component.scss']
})
export class CategoryBoxComponent implements OnInit {

  @Input() categoriesCount: CategoriesCount;
  
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  viewJobsByCategory(category: string) {
    const params = [{key: 'category.label', value: category}];
    this.router.navigate(['/jobs'], { state: {data: params} });
  }

}
