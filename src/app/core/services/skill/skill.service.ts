import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Skill } from '../../models/skill.model';


@Injectable({
  providedIn: 'root',
})
export class SkillService {

readonly API_URL = environment.API_URL + '/api/skills.json';

constructor(private http: HttpClient) { }

  getAllSkills() {
    return this.http.get<Skill[]>(this.API_URL);
  }

  addSkill(skill) {
    return this.http.post(this.API_URL, skill);
  }
}

