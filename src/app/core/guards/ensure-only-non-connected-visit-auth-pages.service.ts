import { TokenService } from '../services/token/token.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from '../services/user/user.service';

@Injectable({
    providedIn: 'root',
})
export class EnsureOnlyNonConnectedVisitAuthPages {
    
    tokenValue: string;
    tokenIsValid: boolean;
    constructor(
        private tokenService: TokenService,
        private userService: UserService,
        private router: Router,
    ) { }

    canActivate() {
        this.tokenIsValid = this.userService.isConnected();
        this.tokenValue = this.tokenService.getToken();
        if ( this.tokenValue && this.tokenIsValid ) {
            this.router.navigate(['/']);
            return false;
        }
        this.tokenService.clear();
        return true;
    }
}