import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const API_URL = environment.API_URL;

@Injectable({
    providedIn: 'root',
})
export class DescriptionService {

    constructor(
        private http: HttpClient
    ) {}

    edit(desc: string, resumeID: number) {
        const d = {description: desc};
        return this.http.put(API_URL + '/api/resumes/' + resumeID, d);
    }
}
