import { Routes } from "@angular/router";
import { MustBeConnected } from '../guards/must-be-connected.guard';

export const ALL_ROUTES: Routes = [
    {
        path: '',
        loadChildren: () => import('src/app/job/job.module')
        .then(m => m.JobModule),
    },
    {
        path: 'candidate',
        canActivate: [MustBeConnected],
        loadChildren: () => import('src/app/candidate/candidate.module')
        .then(m => m.CandidateModule),
    },
    {
        path: 'recruiter',
        loadChildren: () => import('src/app/recruiter/recruiter.module')
        .then(m => m.RecruiterModule),
    }
];

export const AUTH_ROUTES: Routes = [
    {
        path: '',
        loadChildren: () => import('src/app/authentication/authentication.module')
        .then(m => m.AuthenticationModule),
    }
];