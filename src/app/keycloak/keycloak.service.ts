import { Injectable } from '@angular/core';

declare var Keycloak: any;

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  keycloak: any;

  constructor() {
    this.keycloak = Keycloak('http://localhost:4200/assets/keycloak.json');
  }

  init(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
        alert(authenticated ? 'authenticated' : 'not authenticated');
        resolve(authenticated);
      }).catch((error) => {
        alert('failed to initialize');
        reject(error);
      });
    });
  }

  authenticated() {
    return this.keycloak.authenticated;
  }

  token() {
    return this.keycloak.token;
  }

  tokenParsed() {
    return this.keycloak.tokenParsed;
  }

  subject() {
    return this.keycloak.subject;
  }

  idToken() {
    return this.keycloak.idToken;
  }

  idTokenParsed() {
    return this.keycloak.idTokenParsed;
  }

  realmAccess() {
    return this.keycloak.realmAccess;
  }
}
