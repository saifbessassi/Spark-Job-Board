import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Document } from 'src/app/core/models/candidate/document.model';


@Injectable({
    providedIn: 'root',
})
export class CvService {

    readonly API_URL = environment.API_URL + '/api/documents';

    constructor(
        private http: HttpClient
    ) {}

    add(file: File, resumeID: number) {
        const fb = new FormData();
        fb.append('file', file);
        fb.append('resumeID', resumeID.toString());
        return this.http.post(this.API_URL, fb , {
            reportProgress: true,
            observe: 'events'
        });
    }

    delete(id) {
        return this.http.delete(this.API_URL + '/' + id , {
            reportProgress: true,
            observe: 'events'
        });
    }
}
