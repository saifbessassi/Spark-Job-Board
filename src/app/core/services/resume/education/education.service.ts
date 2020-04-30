import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Education } from 'src/app/core/models/candidate/education.model';

const API_URL = environment.API_URL;

@Injectable({
    providedIn: 'root',
})
export class EducationService {
    
    constructor(
        private http: HttpClient
    ){}

    edit(edu: Education) {
        return this.http.put(API_URL + '/api/education/' + edu.id, edu);
    }

    add(edu: Education, resumeID: number) {
        edu.resume = '/api/resumes/' + resumeID;
        return this.http.post(API_URL + '/api/education', edu);
    }

    delete(id: number) {
        return this.http.delete(API_URL + '/api/education/' + id);
    }
}