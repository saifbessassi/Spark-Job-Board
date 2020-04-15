import { Routes } from "@angular/router";

export const ALL_ROUTES: Routes = [
    {
        path: '',
        loadChildren: () => import('src/app/home/home.module')
        .then(m => m.HomeModule),
    }
];