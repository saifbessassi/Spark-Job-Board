import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    constructor(
        private tokenService: TokenService
    ) {}

    getId() {
        const payload = this.tokenService.getPayload();
        if (payload) {
        return payload['id'];
        }
        return null;
    }

    getRoles(): string[] | null {
        const payload = this.tokenService.getPayload();
        if (payload) {
        return payload['roles'];
        }
        return null;
    }

    getFullname(): string | null {
        const payload = this.tokenService.getPayload();
        if (payload) {
        return payload['fullname'];
        }
        return null;
    }

    getEmail(): string | null {
        const payload = this.tokenService.getPayload();
        if (payload) {
        return payload['username'];
        }
        return null;
    }

    getPhoto(): string | null {
        const payload = this.tokenService.getPayload();
        if (payload) {
        return payload['photo'];
        }
        return null;
    }

    isRecruiter() {
        const roles = this.getRoles();
        if (roles) {
        if (roles.includes('ROLE_RECRUITER')) {
            return true;
        }
        return false;
        }
        return null;
    }

    isCandidate() {
        const roles = this.getRoles();
        if (roles) {
        if (roles.includes('ROLE_CANDIDATE')) {
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
        const payload = this.tokenService.getPayload();
        const exp = new Date(0);
        exp.setUTCSeconds(payload['exp']);
        const current_date = new Date();
        return exp > current_date;
    }
}