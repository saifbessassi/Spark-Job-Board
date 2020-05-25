import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../models/job/category.model';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAllCategories() {
    return this.http.get<Category[]>(API_URL + '/api/categories.json');
  }

  addCategory(category) {
    return this.http.post(API_URL + '/api/categories.json', category);
  }
}

