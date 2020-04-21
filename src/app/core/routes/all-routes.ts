import { Routes } from "@angular/router";

export const ALL_ROUTES: Routes = [
    {
        path: '',
        loadChildren: () => import('src/app/job/job.module')
        .then(m => m.JobModule),
    },
    {
        path: 'auth',
        loadChildren: () => import('src/app/authentication/authentication.module')
        .then(m => m.AuthenticationModule),
    }
];