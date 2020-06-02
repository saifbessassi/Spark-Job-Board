import { TestBed } from '@angular/core/testing';

import { TokenService } from './token.service';
import { Token } from '../../models/token.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TokenService', () => {
  let tokenService: TokenService;
  let token = new Token;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ TokenService ]
    });

    tokenService = TestBed.get(TokenService);
    token.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImN0eSI6IkpXVCJ9.eyJpYXQiOjE1OTExMjUxOTAsImV4cCI6MTU5MTEyNjA5MCwicm9sZXMiOlsiUk9MRV9SRUNSVUlURVIiLCJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJyZWNydWl0ZXJAcmVjcnVpdGVyLmNvbSIsImZ1bGxuYW1lIjoicmVjcnVpdGVyIG9uZSIsImlkIjozNDIyfQ.DhLzlFfzYEwsUnDz9p1qtvco9NdEPtQ8yY3Frv6oP3_HOL8d7bT5ZIeSmIl4gppXMoDHq57Ju1lJTNC-lB3FYSrpVIQkpfPYifIeA961qcmFZuYJic_fs42nmRs1ZzuZHMqx-ou7t_MrAOnzbd9HwlmQ5Mx_m005BxxGSZEaaJ_MUX19Zatg9ASmDBPhjMv2vQ4oAbLW1E3QRHLZtzbfdWj4wigRA0L2maymxIGJEFz9HQEW9pQKaR0sElVetxFNeagsrIGVh2oxdSo1hWNQzFz-Ka77dKdaD2fIOIgqLeGuKt6Zp9XV8QXKOr8c2JT-wW2GRl-YtxajDegm2CTM3hLz2MgytCCjoAazOdPHQhwFSFLgb6qKCq1Q3IpfWl48tX_su0oTBl2yXf9Hhx9RpsPUGLdqWwv_htznGaZU49fnTtDD_BFbE4V-HhiSmB6KNBRb6dYlxP5atRooHeqgf5LABBAsN-8onZ1p5Dkf1Qfr4bzKldpNuTr6yLq4ynpB0sVi98oQzUxuRG7_yMWtIEfNr9uYzURX1J9tvCt3kuYBFK5MEaoAFlqeWmOTaZka1qF1T-LXokV4Up7FsOgMoJJAeuJXF4Jki3FleP-ytuYDhlF_GceG6lGATM2EmWpZ6X_WBPFEZXPRtjOK1zSEwjVkgvEuoVcqUcZSjIV3M_o";
    token.refrech_token = '710ebe2b7b397f260cd255cb992061ed522d4e3f9273767f9b65aefa893fdac8821c517410a007ba18917c99322e7236db3321cecefe8b83338237cd09fda4e0';
    token.exp = 1591126090;
    token.iat = 1591125190;
    
  });

  afterEach(() => {
    localStorage.removeItem('token');
  });

  describe('#getAccessToken', () => {
    it('should return access token if there is one', () => {
      localStorage.setItem('token', JSON.stringify(token));
      expect(tokenService.getAccessToken()).toEqual(token.access_token);
    });

    it('should return null if there is no token', () => {
      expect(tokenService.getAccessToken()).toEqual(null);
    });
  });

  describe('#getRefreshToken', () => {
    it('should return refresh token if there is one', () => {
      localStorage.setItem('token', JSON.stringify(token));
      expect(tokenService.getRefreshToken()).toEqual(token.refrech_token);
    });

    it('should return null if there is no token', () => {
      expect(tokenService.getRefreshToken()).toEqual(null);
    });
  });

  describe('#getToken', () => {

    it('should return null if there is no token', () => {
      expect(tokenService.getToken()).toEqual(null);
    });
  });
});
