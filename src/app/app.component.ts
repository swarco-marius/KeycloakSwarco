import { Component, OnInit } from '@angular/core';
import { KeycloakService } from './keycloak/keycloak.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private httpClient: HttpClient, private keycloakService: KeycloakService) {
    this.keycloakService.ready$
      .subscribe(() => {
        console.log(`onReady event`);
      });

    this.keycloakService.authSuccess$
      .subscribe(() => {
        console.log(`onAuthSuccess event`);
      });

    this.keycloakService.authError$
      .subscribe(() => {
        console.log(`onAuthError event`);
      });

    this.keycloakService.authRefreshSuccess$
      .subscribe(() => {
        console.log(`onAuthRefreshSuccess event`);
      });

    this.keycloakService.authRefreshError$
      .subscribe(() => {
        console.log(`onAuthRefreshError event`);
      });

    this.keycloakService.authLogout$
      .subscribe(() => console.log(`onAuthLogout event`));

    this.keycloakService.tokenExpired$
      .subscribe(() => console.log(`onTokenExpired event`));
  }

  ngOnInit() {
    this.keycloakService.init({
      // onLoad: 'login-required',
      checkLoginIframe: false
    }).then(success => {
      console.log(`authenticated: ${this.keycloakService.authenticated()}`);
      console.log(`subjectID: ${this.keycloakService.subject()}`);
      console.log(`token: ${this.keycloakService.token()}`);
      console.log(`tokenParsed: ${JSON.stringify(this.keycloakService.tokenParsed())}`);
      console.log(`idToken: ${this.keycloakService.idToken()}`);
      console.log(`idTokenParsed: ${JSON.stringify(this.keycloakService.idTokenParsed())}`);
      console.log(`realmAccess: ${JSON.stringify(this.keycloakService.realmAccess())}`);
      console.log(`resourceAccess: ${JSON.stringify(this.keycloakService.resourceAccess())}`);
      console.log(`refreshToken: ${this.keycloakService.refreshToken()}`);
      console.log(`refreshTokenParsed: ${JSON.stringify(this.keycloakService.refreshTokenParsed())}`);
      console.log(`timeSkew: ${this.keycloakService.timeSkew()}`);
      console.log(`responseMode: ${this.keycloakService.responseMode()}`);
      console.log(`flow: ${this.keycloakService.flow()}`);
      console.log(`adapter: ${this.keycloakService.adapter()}`);
      console.log(`responseType: ${this.keycloakService.responseType()}`);


      this.getRealmServices();

      this.getAccountService();

      this.getRealms();

      this.getRealm();

      this.getUsers();

      this.editDemo();

    }).catch(error => {
      console.error(error);
    });
  }

  getRealm() {
    const url = 'http://localhost:8080/auth/admin/realms/demo';

    this.keycloakService.request('GET', url)
        .subscribe(result => {
          console.log(result);
        }, error => {
          console.error(error);
        });
  }

  getRealms() {
    const url = 'http://localhost:8080/auth/admin/realms';

    this.keycloakService.request('GET', url)
        .subscribe(result => {
          console.log(result);
        }, error => {
          console.error(error);
        });
  }

  getUsers() {
    const url = 'http://localhost:8080/auth/admin/realms/demo/users';

    this.keycloakService.request('GET', url)
        .subscribe(result => {
          console.log(result);
        }, error => {
          console.error(error);
        });
  }

  getRealmServices() {
    // const url = 'https://auth-dev.swarco.com/auth/realms/swarco/account';
    // const url = 'https://auth-dev.swarco.com/auth/realms/swarco/.well-known/openid-configuration';

    // working API directly from the frontend client
    // let url = 'http://localhost:8080/auth/realms/demo/account';
    // const url = 'http://localhost:8080/auth/realms/demo/.well-known/openid-configuration';
    const url = 'http://localhost:8080/auth/realms/demo';

    this.keycloakService.request('GET', url)
        .subscribe(result => {
          console.log(result);
        }, error => {
          console.error(error);
        });
  }

  getAccountService() {
    const url = 'http://localhost:8080/auth/realms/demo/account';

    this.keycloakService.request('GET', url)
        .subscribe(result => {
          console.log(result);
        }, error => {
          console.error(error);
        });
  }

  editDemo() {

    const url = 'http://localhost:8080/auth/realms/demo/account';
    // const url = 'http://localhost:8080/auth/realms/demo/.well-known/openid-configuration';

    const body = new FormData();
    body.append('stateChecker', 'ZJIgHTXY9TvzW8sD5R292RLXuLfzsDdhXiNULJ-ah_E');
    body.append('email', 's@d.ro');
    body.append('firstName', 'cucu');
    body.append('lastName', 'bau');
    body.append('submitAction', 'Save');

    this.keycloakService.request('POST', url, body)
        .subscribe(result => {
          console.log(result);
        }, error => {
          console.error(error);
        });
  }

  login() {
    this.keycloakService.login({});
  }

  createLoginUrl() {
    console.log(`createLoginUrl(): ${this.keycloakService.createLoginUrl({})}`);
  }

  createLogoutUrl() {
    console.log(`createLogoutUrl(): ${this.keycloakService.createLogoutUrl({})}`);
  }

  register() {
    this.keycloakService.register({action: 'register'});
  }

  authenticated(): boolean {
    return this.keycloakService.authenticated();
  }

  createRegisterUrl() {
    console.log(`createRegisterUrl(): ${this.keycloakService.createRegisterUrl({action: 'register'})}`);
  }

  accountManagement() {
    this.keycloakService.accountManagement();
  }

  createAccountUrl() {
    console.log(`createAccoutUrl(): ${this.keycloakService.createAccountUrl()}`);
  }

  hasRealmRole() {
    console.log(`hasReamlRole(view-profile): ${this.keycloakService.hasRealmRole('view-profile')}`);
  }

  hasResourceRole() {
    console.log(`hasResourceRole(view-profile): ${this.keycloakService.hasResourceRole('view-profile', '')}`);
  }

  loadUserProfile() {
    this.keycloakService.loadUserProfile()
      .then(profile => console.log(`loadUserProfile(): ${JSON.stringify(profile)}`))
      .catch(error => console.error(`loadUserProfole(): ${JSON.stringify(error)}`));
  }

  isTokenExpired() {
    console.log(`isTokenExpired(): ${this.keycloakService.isTokenExpired()}`);
  }

  updateToken() {
    this.keycloakService.updateToken()
      .then(refreshed => {
        console.log(`updateToken(): ${JSON.stringify(refreshed)}`);
      })
      .catch(error => console.error(`updateToken(): ${JSON.stringify(error)}`));
  }

  clearToken() {
    this.keycloakService.clearToken();
  }

  logout() {
    this.keycloakService.logout({redirectUri: ''});
  }
}
