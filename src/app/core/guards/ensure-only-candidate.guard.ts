import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { AuthenticationService } from '../services/auth/authentication.service';

@Injectable({
    providedIn: 'root',
})
export class EnsureOnlyCandidateGuard {

    isCandidate: boolean;

    constructor(
        private authService: AuthenticationService,
        private userService: UserService,
        private router: Router
    ) {
        this.isCandidate = false;
        this.authService.currentUser.subscribe(user => {
            if (user) {
                this.isCandidate = userService.isCandidate(user);
            } else {
                this.isCandidate = false;
            }
        });
    }

    canActivate() {
        if (!this.isCandidate) {
            this.router.navigate(['/']);
            return false;
        }
        return true;
    }
}
