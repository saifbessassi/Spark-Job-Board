import { TokenService } from '../services/token/token.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class EnsureOnlyNonConnectedVisitAuthPages {
    
    tokenValue: string;
    tokenIsValid: boolean;
    constructor(
        private tokenService: TokenService,
        private router: Router,
    ) { }

    canActivate() {
        this.tokenIsValid = this.tokenService.isValid();
        this.tokenValue = this.tokenService.getToken();
        if ( this.tokenValue && this.tokenIsValid ) {
            this.router.navigate(['/']);
            return false;
        }
        this.tokenService.clear();
        return true;
    }
}