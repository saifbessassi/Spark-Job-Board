import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LanguageCandidate } from 'src/app/core/models/candidate/lang-candidate.model';


@Injectable({
    providedIn: 'root',
})
export class LanguageCandidateService {

    readonly API_URL = environment.API_URL + '/api/language_candidates';

    constructor(
        private http: HttpClient
    ) {}

    edit(lang: LanguageCandidate) {
        lang.language = '/api/languages/' + lang.language;
        return this.http.put(this.API_URL + '/' + lang.id, lang);
    }

    add(lang: LanguageCandidate, resumeID: number) {
        lang.resume = '/api/resumes/' + resumeID;
        lang.language = '/api/languages/' + lang.language;
        return this.http.post(this.API_URL, lang);
    }

    delete(id: number) {
        return this.http.delete(this.API_URL + '/' + id);
    }
}
