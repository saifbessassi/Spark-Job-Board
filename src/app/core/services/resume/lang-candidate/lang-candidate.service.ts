import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LanguageCandidateRequest } from 'src/app/core/models/candidate/lang-candidate-request.model';

const API_URL = environment.API_URL;

@Injectable({
    providedIn: 'root',
})
export class LanguageCandidateService {

    constructor(
        private http: HttpClient
    ) {}

    edit(lang: LanguageCandidateRequest) {
        lang.language = '/api/languages/' + lang.language;
        return this.http.put(API_URL + '/api/language_candidates/' + lang.id, lang);
    }

    add(lang: LanguageCandidateRequest, resumeID: number) {
        lang.resume = '/api/resumes/' + resumeID;
        lang.language = '/api/languages/' + lang.language;
        return this.http.post(API_URL + '/api/language_candidates', lang);
    }

    delete(id: number) {
        return this.http.delete(API_URL + '/api/language_candidates/' + id);
    }
}
