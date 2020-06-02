import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Project } from 'src/app/core/models/candidate/project.model';


@Injectable({
    providedIn: 'root',
})
export class ProjectService {

    readonly API_URL = environment.API_URL + '/api/projects';

    constructor(
        private http: HttpClient
    ) {}

    edit(prj: Project) {
        return this.http.put(this.API_URL + '/' + prj.id, prj);
    }

    add(prj: Project, resumeID: number) {
        prj.resume = '/api/resumes/' + resumeID;
        return this.http.post(this.API_URL, prj);
    }

    delete(id: number) {
        return this.http.delete(this.API_URL + '/' + id);
    }
}
