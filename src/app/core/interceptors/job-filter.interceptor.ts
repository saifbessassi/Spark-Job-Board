import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpParams,
  } from '@angular/common/http';
import { Observable } from 'rxjs';

export class JobFilterInterceptor implements HttpInterceptor {
    newReq;
    params: HttpParams;
    jobSkill: boolean;
    candidateSkill: boolean;
    candidateSeniority: boolean;
    categoryIndex: boolean;
    createdAtFilter: boolean;
    deadlineFilter: boolean;
    isGetAllJobsUrl: boolean;
    isGetAllCandidateUrl: boolean;
    isMethodGet: boolean;
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        this.params = null;
        this.createdAtFilter = req.params.keys().includes('createdAt[after]');
        this.deadlineFilter = req.params.keys().includes('deadline[after]');
        this.jobSkill = req.params.keys().includes('skills');
        this.candidateSkill = req.params.keys().includes('candidateSkills');
        this.candidateSeniority = req.params.keys().includes('resume');
        this.categoryIndex = req.params.keys().includes('category');

        this.isGetAllJobsUrl = req.url.includes('/api/jobs');
        this.isGetAllCandidateUrl = req.url.includes('/api/candidates');
        this.isMethodGet = req.method === 'GET';

        // Copie the current url
        this.newReq = req.clone();

        // if url is to get all jobs
        if (this.isGetAllJobsUrl && this.isMethodGet) {

            // If user uses category filter
            if (this.categoryIndex) {
                let categoryValue = this.newReq.params.get('category');
                this.params = this.newReq.params.delete('category');
                this.newReq = this.newReq.clone({
                    params: this.params.set('category.label', categoryValue),

                });
            }

            // If user uses skills filter
            if (this.jobSkill) {
                let skillValue = this.newReq.params.get('skills');
                this.params = this.newReq.params.delete('skills');
                let key = 'skills.label';
                this.newReq = this.newReq.clone({
                    params: this.params.set(key, skillValue),

                });
            }

                // If user uses createdAt filter
                if (this.createdAtFilter && this.newReq.params.get('createdAt[after]').includes('/')) {
                    console.log(this.newReq.params.get('createdAt[after]'))
                    const wrongReq: string = this.newReq.params.get('createdAt[after]');
                    const afterValue = wrongReq.slice(0, wrongReq.indexOf('/'));
                    const endValue = wrongReq.slice(wrongReq.indexOf('/') + 1);
                    this.params = this.newReq.params.delete('createdAt[after]');
                    this.newReq = this.newReq.clone({
                        params: [
                            this.params
                                .set('createdAt[after]', afterValue)
                                .set('createdAt[before]', endValue),
                        ]
                    });
                }

                // If user uses deadline filter
                if (this.deadlineFilter && this.newReq.params.get('deadline[after]').includes('/')) {
                    const wrongReq: string = this.newReq.params.get('deadline[after]');
                    const afterValue = wrongReq.slice(0, wrongReq.indexOf('/'));
                    const endValue = wrongReq.slice(wrongReq.indexOf('/') + 1);
                    this.params = this.newReq.params.delete('deadline[after]');
                    this.newReq = this.newReq.clone({
                        params: [
                            this.params
                                .set('deadline[after]', afterValue)
                                .set('deadline[before]', endValue),
                        ]
                    });
                }
                
            

        } 
        // if url is to get all candidates
        else if (this.isGetAllCandidateUrl && this.isMethodGet) {
            
            // If user uses skills filter
            if (this.candidateSkill) {
                let skillValue = this.newReq.params.get('candidateSkills');
                this.params = this.newReq.params.delete('candidateSkills');
                let key = 'candidateSkills.skill.label';
                this.newReq = this.newReq.clone({
                    params: this.params.set(key, skillValue),
                });
            }

            // If user uses seniority filter
            if (this.candidateSeniority) {
                let skillValue = this.newReq.params.get('resume');
                this.params = this.newReq.params.delete('resume');
                let key = 'resume.seniorityLevel';
                this.newReq = this.newReq.clone({
                    params: this.params.set(key, skillValue),
                });
            }
        }

        return next.handle(this.newReq);
    }
}
