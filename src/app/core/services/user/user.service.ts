import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { User } from '../../models/user.service';
import { AuthenticationService } from '../auth/authentication.service';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    user: User;

    constructor(
        private tokenService: TokenService,
        private authService: AuthenticationService
    ) {
        // this.user = JSON.parse(localStorage.getItem('currentUser'));
        authService.currentUser.subscribe(data => {
            this.user = data;
        })
    }

    isRecruiter() {
        if (this.user) {
            if (this.user.roles.includes('ROLE_RECRUITER')) {
                return true;
            }
            return false;
        }
        return null;
    }

    isCandidate() {
        if (this.user) {
            if (this.user.roles.includes('ROLE_CANDIDATE')) {
                return true;
            }
            return false;
        }
        return null;
    }

    isConnected() {
        if (!this.tokenService.getToken()) {
        return false;
        }
        const exp = new Date(0);
        exp.setUTCSeconds(this.tokenService.token.exp);
        const current_date = new Date();
        return exp > current_date;
    }
}