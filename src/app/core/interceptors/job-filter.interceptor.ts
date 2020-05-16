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
    skillIndex: boolean;
    categoryIndex: boolean;
    isGetAllJobsUrl: boolean;
    isMethodGet: boolean;
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        this.params = null;
        this.skillIndex = req.params.keys().includes('skills');
        this.categoryIndex = req.params.keys().includes('category');
        this.isGetAllJobsUrl = req.url.includes('/api/jobs');
        this.isMethodGet = req.method === 'GET';
        if ( this.isGetAllJobsUrl && this.isMethodGet && (this.skillIndex || this.categoryIndex)) {
            this.newReq = req.clone();
            if (this.skillIndex) {
                let skillValue = this.newReq.params.get('skills');
                this.params = this.newReq.params.delete('skills');
                this.newReq = this.newReq.clone({
                    params: this.params.set('skills.label', skillValue),

                });
            }
            if (this.categoryIndex) {
                let categoryValue = this.newReq.params.get('category');
                this.params = this.newReq.params.delete('category');
                this.newReq = this.newReq.clone({
                    params: this.params.set('category.label', categoryValue),

                });
            }
        return next.handle(this.newReq);
        }
        return next.handle(req);
    }
}
