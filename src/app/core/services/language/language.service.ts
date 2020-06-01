import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Skill } from '../../models/skill.model';
import { Language } from '../../models/language.model';


@Injectable({
  providedIn: 'root',
})
export class LanguageService {

  readonly API_URL = environment.API_URL + '/api/languages.json';

  constructor(private http: HttpClient) { }

  getAllLanguages() {
    return this.http.get<Language[]>(this.API_URL);
  }
}

