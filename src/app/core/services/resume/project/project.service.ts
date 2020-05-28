import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Project } from 'src/app/core/models/candidate/project.model';

const API_URL = environment.API_URL;

@Injectable({
    providedIn: 'root',
})
export class ProjectService {

    constructor(
        private http: HttpClient
    ) {}

    edit(prj: Project) {
        return this.http.put(API_URL + '/api/projects/' + prj.id, prj);
    }

    add(prj: Project, resumeID: number) {
        prj.resume = '/api/resumes/' + resumeID;
        return this.http.post(API_URL + '/api/projects', prj);
    }

    delete(id: number) {
        return this.http.delete(API_URL + '/api/projects/' + id);
    }
}
