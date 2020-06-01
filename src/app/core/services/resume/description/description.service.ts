import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root',
})
export class DescriptionService {

    readonly API_URL = environment.API_URL + '/api/resumes';

    constructor(
        private http: HttpClient
    ) {}

    edit(desc: string, resumeID: number) {
        const d = {description: desc};
        return this.http.put(this.API_URL + '/' + resumeID, d);
    }
}
