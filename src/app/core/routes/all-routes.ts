import { Routes } from "@angular/router";

export const ALL_ROUTES: Routes = [
    {
        path: '',
        loadChildren: () => import('src/app/job/job.module')
        .then(m => m.JobModule),
    },
    {
        path: 'candidate',
        loadChildren: () => import('src/app/candidate/candidate.module')
        .then(m => m.CandidateModule),
    }
];

export const AUTH_ROUTES: Routes = [
    {
        path: '',
        loadChildren: () => import('src/app/authentication/authentication.module')
        .then(m => m.AuthenticationModule),
    }
];