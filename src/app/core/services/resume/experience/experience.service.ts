import { Injectable } from '@angular/core';
import { Experience } from 'src/app/core/models/candidate/experience.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const API_URL = environment.API_URL;

@Injectable({
    providedIn: 'root',
})
export class ExperienceService {

    constructor(
        private http: HttpClient
    ) {}

    edit(exp: Experience) {
        return this.http.put(API_URL + '/api/experiences/' + exp.id, exp);
    }

    add(exp: Experience, resumeID: number) {
        exp.resume = '/api/resumes/' + resumeID;
        return this.http.post(API_URL + '/api/experiences', exp);
    }

    delete(id: number) {
        return this.http.delete(API_URL + '/api/experiences/' + id);
    }
}
