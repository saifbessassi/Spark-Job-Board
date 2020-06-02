import { Injectable } from '@angular/core';
import { Experience } from 'src/app/core/models/candidate/experience.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root',
})
export class ExperienceService {

    readonly API_URL = environment.API_URL + '/api/experiences';

    constructor(
        private http: HttpClient
    ) {}

    edit(exp: Experience) {
        return this.http.put(this.API_URL + '/' + exp.id, exp);
    }

    add(exp: Experience, resumeID: number) {
        exp.resume = '/api/resumes/' + resumeID;
        return this.http.post(this.API_URL, exp);
    }

    delete(id: number) {
        return this.http.delete(this.API_URL + '/' + id);
    }
}
