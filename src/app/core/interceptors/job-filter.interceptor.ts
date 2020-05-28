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
    createdAtFilter: boolean;
    deadlineFilter: boolean;
    isGetAllJobsUrl: boolean;
    isMethodGet: boolean;
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        this.params = null;
        this.createdAtFilter = req.params.keys().includes('createdAt[after]');
        this.deadlineFilter = req.params.keys().includes('deadline[after]');

        this.isGetAllJobsUrl = req.url.includes('/api/jobs');
        this.isMethodGet = req.method === 'GET';

        // Copie the current url
        this.newReq = req.clone();

        // if url is to get all jobs
        if (this.isGetAllJobsUrl && this.isMethodGet) {

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

        return next.handle(this.newReq);
    }
}
