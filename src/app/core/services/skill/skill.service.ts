import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Skill } from '../../models/skill.model';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root',
})
export class SkillService {

  constructor(private http: HttpClient) { }

  getAllSkills() {
    return this.http.get<Skill[]>(API_URL + '/api/skills.json');
  }
}

