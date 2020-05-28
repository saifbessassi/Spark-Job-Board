import { TokenService } from '../services/token/token.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { AuthenticationService } from '../services/auth/authentication.service';

@Injectable({
    providedIn: 'root',
})
export class EnsureOnlyNonConnectedVisitAuthPages {

    tokenValue: string;
    tokenIsValid: boolean;
    constructor(
        private tokenService: TokenService,
        private userService: UserService,
        private authService: AuthenticationService,
        private router: Router,
    ) { }

    canActivate() {
        this.tokenIsValid = this.userService.isConnected();
        // this.tokenValue = this.tokenService.getToken();
        if ( this.tokenIsValid ) {
            this.router.navigate(['/']);
            return false;
        }
        this.authService.logout();
        return true;
    }
}
