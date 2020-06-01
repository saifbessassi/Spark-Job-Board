import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../models/job/category.model';


@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  readonly API_URL = environment.API_URL + '/api/categories.json';

  constructor(private http: HttpClient) { }

  getAllCategories() {
    return this.http.get<Category[]>(this.API_URL);
  }

  addCategory(category) {
    return this.http.post(this.API_URL, category);
  }
}

