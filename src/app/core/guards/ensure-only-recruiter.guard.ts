import { TokenService } from '../services/token/token.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { AuthenticationService } from '../services/auth/authentication.service';

@Injectable({
    providedIn: 'root',
})
export class EnsureOnlyRecruiterGuard {
    
    isRecruiter: boolean;

    constructor(
        private authService: AuthenticationService,
        private userService: UserService,
        private router: Router
    ) {
        this.isRecruiter = false;
        this.authService.currentUser.subscribe(user => {
        if (user) {
            this.isRecruiter = userService.isRecruiter(user);
        }
        })
    }

    canActivate() {
        if (!this.isRecruiter) {
            this.router.navigate(['/']);
            return false;
        }
        return true;
    }
}