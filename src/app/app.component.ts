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
  }

  ngOnInit() {
    this.keycloakService.init({ onLoad: 'login-required' }).then(success => {
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
    }).catch(error => {
      console.error(error);
    });
  }

  authenticated(): boolean {
    return this.keycloakService.authenticated();
  }

  logout() {
    this.keycloakService.logout({redirectUri: ''});
  }
}
