import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Document } from 'src/app/core/models/candidate/document.model';

const API_URL = environment.API_URL;

@Injectable({
    providedIn: 'root',
})
export class CvService {

    constructor(
        private http: HttpClient
    ) {}

    add(file: File, resumeID: number) {
        const fb = new FormData();
        fb.append('file', file);
        fb.append('resumeID', resumeID.toString());
        return this.http.post(API_URL + '/api/documents', fb , {
            reportProgress: true,
            observe: 'events'
        });
    }

    delete(id) {
        return this.http.delete(API_URL + '/api/documents/' + id , {
            reportProgress: true,
            observe: 'events'
        });
    }
}
