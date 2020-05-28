import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from '../services/user/user.service';

@Injectable({
    providedIn: 'root',
})
export class MustBeConnected {

    isConnected: boolean;
    constructor(
        private userService: UserService,
        private router: Router,
    ) { }

    canActivate() {
        this.isConnected = this.userService.isConnected();
        if (this.isConnected) {
            return true;
        }
        this.router.navigate(['/']);
        return false;
    }
}
