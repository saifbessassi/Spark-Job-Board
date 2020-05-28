import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SkillCandidateRequest } from 'src/app/core/models/candidate/skill-candidate-request.model';

const API_URL = environment.API_URL;

@Injectable({
    providedIn: 'root',
})
export class SkillCandidateService {

    constructor(
        private http: HttpClient
    ) {}

    edit(skill: SkillCandidateRequest) {
        skill.skill = '/api/skills/' + skill.skill;
        return this.http.put(API_URL + '/api/skill_candidates/' + skill.id, skill);
    }

    add(skill: SkillCandidateRequest, resumeID: number) {
        skill.resume = '/api/resumes/' + resumeID;
        skill.skill = '/api/skills/' + skill.skill;
        return this.http.post(API_URL + '/api/skill_candidates', skill);
    }

    delete(id: number) {
        return this.http.delete(API_URL + '/api/skill_candidates/' + id);
    }
}
