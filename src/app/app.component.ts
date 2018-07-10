import { Component, OnInit } from '@angular/core';
import { KeycloakService } from './keycloak/keycloak.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private httpClient: HttpClient, private keycloakService: KeycloakService) {
  }

  configUrl = 'http://localhost:4200/assets/keycloak.json';

getConfig() {
  return this.httpClient.get(this.configUrl);
}

  ngOnInit() {
    /*
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      observe: 'response'
    };
    this.httpClient.get('http://localhost:4200/assets/keycloak.json').subscribe(result => {
      console.log(result);
    }, error => {
      console.log(error);
    });
    */

    this.keycloakService.init().then(success => {
      console.log(`authenticated: ${this.keycloakService.authenticated()}`);
      console.log(`subjectID: ${this.keycloakService.subject()}`);
      console.log(`token: ${this.keycloakService.token()}`);
      console.log(`tokenParsed: ${JSON.stringify(this.keycloakService.tokenParsed())}`);
      console.log(`idToken: ${this.keycloakService.idToken()}`);
      console.log(`idTokenParsed: ${JSON.stringify(this.keycloakService.idTokenParsed())}`);
      console.log(`realmAccess: ${JSON.stringify(this.keycloakService.realmAccess())}`);
    }).catch(error => {
      console.log(error);
    });
  }
}
