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

  /*
    Called to initialize the adapter.
    Options is an Object, where:
      onLoad - Specifies an action to do on load. Supported values are 'login-required' or 'check-sso'.
      token - Set an initial value for the token.
      refreshToken - Set an initial value for the refresh token.
      idToken - Set an initial value for the id token (only together with token or refreshToken).
      timeSkew - Set an initial value for skew between local time and Keycloak server in seconds
                (only together with token or refreshToken).
      checkLoginIframe - Set to enable/disable monitoring login state (default is true).
      checkLoginIframeInterval - Set the interval to check login state (default is 5 seconds).
      responseMode - Set the OpenID Connect response mode send to Keycloak server at login request.
                     Valid values are query or fragment . Default value is fragment, which means that
                     after successful authentication will Keycloak redirect to javascript application
                     with OpenID Connect parameters added in URL fragment. This is generally safer and recommended over query.
      flow - Set the OpenID Connect flow. Valid values are standard, implicit or hybrid.

    Returns promise to set functions to be invoked on success or error.
  */
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

  /*
    Is true if the user is authenticated, false otherwise.
  */
  authenticated() {
    return this.keycloak.authenticated;
  }

  /*
    The base64 encoded token that can be sent in the Authorization header in requests to services.
  */
  token() {
    return this.keycloak.token;
  }

  /*
    The parsed token as a JavaScript object.
  */
  tokenParsed() {
    return this.keycloak.tokenParsed;
  }

  /*
    The user id.
  */
  subject() {
    return this.keycloak.subject;
  }

  /*
    The base64 encoded ID token.
  */
  idToken() {
    return this.keycloak.idToken;
  }

  /*
    The parsed id token as a JavaScript object.
  */
  idTokenParsed() {
    return this.keycloak.idTokenParsed;
  }

  /*
    The realm roles associated with the token.
  */
  realmAccess() {
    return this.keycloak.realmAccess;
  }

  /*
    The resource roles associated with the token.
  */
  resourceAccess() {
    return this.keycloak.resourceAccess;
  }

  /*
    The base64 encoded refresh token that can be used to retrieve a new token.
  */
  refreshToken() {
    return this.keycloak.refreshToken;
  }

  /*
    The parsed refresh token as a JavaScript object.
  */
  refreshTokenParsed() {
    return this.keycloak.refreshTokenParsed;
  }

  /*
    The estimated time difference between the browser time and the Keycloak server in seconds.
    This value is just an estimation, but is accurate enough when determining if a token is expired or not.
  */
  timeSkew() {
    return this.keycloak.timeSkew;
  }

  /*
    Response mode passed in init (default value is fragment).
  */
  responseMode() {
    return this.keycloak.responseMode;
  }

  /*
    Flow passed in init.
  */
  flow() {
    return this.keycloak.flow;
  }

  /*
    Allows you to override the way that redirects and other browser-related functions will be handled by the library.
    Available options:
      "default" - the library uses the browser api for redirects (this is the default)
      "cordova" - the library will try to use the InAppBrowser cordova plugin to load
                  keycloak login/registration pages (this is used automatically when the library is working in a cordova ecosystem)
      "custom" - allows you to implement a custom adapter (only for advanced use cases)
  */
  adapter() {
    return this.keycloak.adapter;
  }

  /*
    Response type sent to Keycloak with login requests.
    This is determined based on the flow value used during initialization, but can be overridden by setting this value.
  */
  responseType() {
    return this.keycloak.responseType;
  }
}
