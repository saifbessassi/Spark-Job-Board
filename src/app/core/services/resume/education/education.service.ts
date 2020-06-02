import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Education } from 'src/app/core/models/candidate/education.model';


@Injectable({
    providedIn: 'root',
})
export class EducationService {

    readonly API_URL = environment.API_URL + '/api/education';

    constructor(
        private http: HttpClient
    ) {}

    edit(edu: Education) {
        return this.http.put(this.API_URL + '/' + edu.id, edu);
    }

    add(edu: Education, resumeID: number) {
        edu.resume = '/api/resumes/' + resumeID;
        return this.http.post(this.API_URL, edu);
    }

    delete(id: number) {
        return this.http.delete(this.API_URL + '/' + id);
    }
}
