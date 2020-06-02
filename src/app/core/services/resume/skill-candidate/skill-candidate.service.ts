import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SkillCandidate } from 'src/app/core/models/candidate/skill-candidate.model';


@Injectable({
    providedIn: 'root',
})
export class SkillCandidateService {

    readonly API_URL = environment.API_URL + '/api/skill_candidates';

    constructor(
        private http: HttpClient
    ) {}

    edit(skill: SkillCandidate) {
        skill.skill = '/api/skills/' + skill.skill;
        return this.http.put(this.API_URL + '/' + skill.id, skill);
    }

    add(skill: SkillCandidate, resumeID: number) {
        skill.resume = '/api/resumes/' + resumeID;
        skill.skill = '/api/skills/' + skill.skill;
        return this.http.post(this.API_URL, skill);
    }

    delete(id: number) {
        return this.http.delete(this.API_URL + '/' + id);
    }
}
