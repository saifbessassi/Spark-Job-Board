import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { User } from '../../models/user.service';
import { AuthenticationService } from '../auth/authentication.service';
import { Token } from '../../models/token.model';

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
        });
    }

    isRecruiter(user: User) {
        if (user) {
            if (user.roles.includes('ROLE_RECRUITER')) {
                return true;
            }
            return false;
        }
        return false;
    }

    isCandidate(user: User) {
        if (user) {
            if (user.roles.includes('ROLE_CANDIDATE')) {
                return true;
            }
            return false;
        }
        return false;
    }

    isConnected() {
        const token: Token = this.tokenService.getToken();
        if (!token) {
            return false;
        }
        const exp = new Date(0);
        exp.setUTCSeconds(token.exp);
        const currentDate = new Date();
        return exp > currentDate;
    }
}
