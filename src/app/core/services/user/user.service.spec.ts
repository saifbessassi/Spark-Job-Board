import { User } from "../../models/user.service"
import { UserService } from './user.service';
import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from '../auth/authentication.service';
import { TokenService } from '../token/token.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Token } from '../../models/token.model';

describe('UserService', () => {
    let user = new User;
    let userService: UserService;
    let tokenService: TokenService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [ UserService, AuthenticationService, TokenService ]
        });
        userService = TestBed.get(UserService);
        tokenService = TestBed.get(TokenService);
        user.id = 1;
        user.email = 'mail@mail.com';
        user.fullname = 'user user';
        user.roles = ["ROLE_USER"];
    });

    describe('#isRecruiter', () => {
        it('should return true if user is a recruiter', () => {
            user.roles.push('ROLE_RECRUITER');
            expect(userService.isRecruiter(user)).toEqual(true);
        });

        it('should return false if user is not a recruiter', () => {
            expect(userService.isRecruiter(user)).toEqual(false);
        });

        it('should return false if user is a null', () => {
            expect(userService.isRecruiter(null)).toEqual(false);
        });
    });

    describe('#isCandidate', () => {
        it('should return true if user is a candidate', () => {
            user.roles.push('ROLE_CANDIDATE');
            expect(userService.isCandidate(user)).toEqual(true);
        });

        it('should return false if user is not a candidate', () => {
            expect(userService.isCandidate(user)).toEqual(false);
        });

        it('should return false if user is a null', () => {
            expect(userService.isCandidate(null)).toEqual(false);
        });
    });

    describe('#isConnected', () => {
        let token = new Token;
        token.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImN0eSI6IkpXVCJ9.eyJpYXQiOjE1OTExMjUxOTAsImV4cCI6MTU5MTEyNjA5MCwicm9sZXMiOlsiUk9MRV9SRUNSVUlURVIiLCJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJyZWNydWl0ZXJAcmVjcnVpdGVyLmNvbSIsImZ1bGxuYW1lIjoicmVjcnVpdGVyIG9uZSIsImlkIjozNDIyfQ.DhLzlFfzYEwsUnDz9p1qtvco9NdEPtQ8yY3Frv6oP3_HOL8d7bT5ZIeSmIl4gppXMoDHq57Ju1lJTNC-lB3FYSrpVIQkpfPYifIeA961qcmFZuYJic_fs42nmRs1ZzuZHMqx-ou7t_MrAOnzbd9HwlmQ5Mx_m005BxxGSZEaaJ_MUX19Zatg9ASmDBPhjMv2vQ4oAbLW1E3QRHLZtzbfdWj4wigRA0L2maymxIGJEFz9HQEW9pQKaR0sElVetxFNeagsrIGVh2oxdSo1hWNQzFz-Ka77dKdaD2fIOIgqLeGuKt6Zp9XV8QXKOr8c2JT-wW2GRl-YtxajDegm2CTM3hLz2MgytCCjoAazOdPHQhwFSFLgb6qKCq1Q3IpfWl48tX_su0oTBl2yXf9Hhx9RpsPUGLdqWwv_htznGaZU49fnTtDD_BFbE4V-HhiSmB6KNBRb6dYlxP5atRooHeqgf5LABBAsN-8onZ1p5Dkf1Qfr4bzKldpNuTr6yLq4ynpB0sVi98oQzUxuRG7_yMWtIEfNr9uYzURX1J9tvCt3kuYBFK5MEaoAFlqeWmOTaZka1qF1T-LXokV4Up7FsOgMoJJAeuJXF4Jki3FleP-ytuYDhlF_GceG6lGATM2EmWpZ6X_WBPFEZXPRtjOK1zSEwjVkgvEuoVcqUcZSjIV3M_o";
        token.refrech_token = '710ebe2b7b397f260cd255cb992061ed522d4e3f9273767f9b65aefa893fdac8821c517410a007ba18917c99322e7236db3321cecefe8b83338237cd09fda4e0';
        
        it('should return true if user is connected', () => {
            token.exp = 2537817960;
            token.iat = 2537817900;
            spyOn(tokenService, 'getToken').and.returnValue(token);
            expect(userService.isConnected()).toEqual(true);
        });

        it('should return false if user is not connected', () => {
            token.exp = 1591126090;
            token.iat = 1591125190;
            spyOn(tokenService, 'getToken').and.returnValue(token);
            expect(userService.isConnected()).toEqual(false);
        });

        it('should return false if there is no user', () => {
            spyOn(tokenService, 'getToken').and.returnValue(null);
            expect(userService.isConnected()).toEqual(false);
        });
    })
})