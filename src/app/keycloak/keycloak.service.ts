import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import * as Keycloak from 'keycloak-js';
import { HttpClient } from '@angular/common/http';
// declare var Keycloak: any;

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  keycloak: any;

  readySource: Subject<any>;
  ready$: Observable<any>;
  authSuccessSource: Subject<any>;
  authSuccess$: Observable<any>;
  authErrorSource: Subject<any>;
  authError$: Observable<any>;
  authRefreshSuccessSource: Subject<any>;
  authRefreshSuccess$: Observable<any>;
  authRefreshErrorSource: Subject<any>;
  authRefreshError$: Observable<any>;
  authLogoutSource: Subject<any>;
  authLogout$: Observable<any>;
  tokenExpiredSource: Subject<any>;
  tokenExpired$: Observable<any>;

  constructor(private httpClient: HttpClient) {
    // use one of the following methods to instantiate Keycloak

    this.keycloak = Keycloak();
    // this.keycloak = new Keycloak();
    // this.keycloak = new Keycloak('http://localhost:4200/keycloak.json');
    // this.keycloak = new Keycloak({ url: 'http://localhost:8080/auth', realm: 'demo', clientId: 'primeng' });

    this.readySource = new Subject();
    this.ready$ = this.readySource.asObservable();

    this.authSuccessSource = new Subject();
    this.authSuccess$ = this.authSuccessSource.asObservable();

    this.authErrorSource = new Subject();
    this.authError$ = this.authErrorSource.asObservable();

    this.authRefreshSuccessSource = new Subject();
    this.authRefreshSuccess$ = this.authRefreshSuccessSource.asObservable();

    this.authRefreshErrorSource = new Subject();
    this.authRefreshError$ = this.authRefreshErrorSource.asObservable();

    this.authLogoutSource = new Subject();
    this.authLogout$ = this.authLogoutSource.asObservable();

    this.tokenExpiredSource = new Subject();
    this.tokenExpired$ = this.tokenExpiredSource.asObservable();

    /////////////////////
    // callback events //
    /////////////////////
    this.keycloak.onReady = () => {
      this.readySource.next();
     };

    this.keycloak.onAuthSuccess = () => {
      this.authSuccessSource.next();
    };

    this.keycloak.onAuthError = () => {
      this.authErrorSource.next();
    };

    this.keycloak.onAuthRefreshSuccess = () => {
      this.authRefreshSuccessSource.next();
    };

    this.keycloak.onAuthRefreshError = () => {
      this.authRefreshErrorSource.next();
    };

    this.keycloak.onAuthLogout = () => {
      this.authLogoutSource.next();
    };

    this.keycloak.onTokenExpired = () => {
      this.tokenExpiredSource.next();
    };
  }

  /////////////
  // METHODS //
  /////////////

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
  init(options): Promise<any> {
    return new Promise((resolve, reject) => {
      this.keycloak.init(options).then(authenticated => {
        resolve(authenticated);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  /*
    Redirects to login form on (options is an optional object with redirectUri and/or prompt fields).
    Options is an Object, where:
      redirectUri - Specifies the uri to redirect to after login.
      prompt - By default the login screen is displayed if the user is not logged-in to Keycloak.
               To only authenticate to the application if the user is already logged-in and not display
               the login page if the user is not logged-in, set this option to none. To always require
               re-authentication and ignore SSO, set this option to login .
      maxAge - Used just if user is already authenticated. Specifies maximum time since the authentication
               of user happened. If user is already authenticated for longer time than maxAge, the SSO is
               ignored and he will need to re-authenticate again.
      loginHint - Used to pre-fill the username/email field on the login form.
      scope - Used to forward the scope parameter to the Keycloak login endpoint. Use a space-delimited
              list of scopes. Those typically reference Client scopes defined on particular client. Note
              that the scope openid will be always be added to the list of scopes by the adapter. For example,
              if you enter the scope options address phone, then the request to Keycloak will contain the scope
              parameter scope=openid address phone.
      idpHint - Used to tell Keycloak to skip showing the login page and automatically redirect to the specified
                identity provider instead. More info in the Identity Provider documentation.
      action - If value is 'register' then user is redirected to registration page, otherwise to login page.
      locale - Sets the 'ui_locales' query param in compliance with section 3.1.2.1 of the OIDC 1.0 specification.
      kcLocale - Specifies the desired Keycloak locale for the UI. This differs from the locale param in that it
                 tells the Keycloak server to set a cookie and update the user’s profile to a new preferred locale.
      cordovaOptions - Specifies the arguments that are passed to the Cordova in-app-browser (if applicable).
                       Options hidden and location are not affected by these arguments. All available options are
                       defined at https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-inappbrowser/.
                       Example of use: { zoom: "no", hardwareback: "yes" };
  */
  login(options?) {
    this.keycloak.login(options);
  }

  /*
    Returns the URL to login form on (options is an optional object with redirectUri and/or prompt fields).
    Options is an Object, which supports same options like the function login .
  */
  createLoginUrl(options?) {
    return this.keycloak.createLoginUrl(options);
  }

  /*
    Redirects to logout.
    Options is an Object, where:
      redirectUri - Specifies the uri to redirect to after logout.
  */
  logout(options) {
    this.keycloak.logout(options);
  }

  /*
    Returns the URL to logout the user.
    Options is an Object, where:
      redirectUri - Specifies the uri to redirect to after logout.
  */
  createLogoutUrl(options) {
    return this.keycloak.createLogoutUrl(options);
  }

  /*
    Redirects to registration form. Shortcut for login with option action = 'register'
    Options are same as for the login method but 'action' is set to 'register'
  */
  register(options) {
    this.keycloak.register(options);
  }

  /*
    Returns the url to registration page. Shortcut for createLoginUrl with option action = 'register'
    Options are same as for the createLoginUrl method but 'action' is set to 'register'
  */
  createRegisterUrl(options) {
    return this.keycloak.createRegisterUrl(options);
  }

  /*
    Redirects to the Account Management Console.
  */
  accountManagement() {
    this.keycloak.accountManagement();
  }

  /*
    Returns the URL to the Account Management Console.
  */
  createAccountUrl() {
    return this.keycloak.createAccountUrl();
  }

  /*
    Returns true if the token has the given realm role.
  */
  hasRealmRole(role) {
    return this.keycloak.hasRealmRole(role);
  }

  /*
    Returns true if the token has the given role for the resource (resource is optional, if not specified clientId is used).
  */
  hasResourceRole(role, resource?) {
    return this.keycloak.hasResourceRole(role, resource);
  }

  /*
    Loads the users profile.
    Returns promise to set functions to be invoked if the profile was loaded successfully, or if the profile could not be loaded.
    For example:

      keycloak.loadUserProfile().then(function(profile) {
              alert(JSON.stringify(test, null, "  "));
          }).catch(function() {
              alert('Failed to load user profile');
          });
  */
  loadUserProfile(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.keycloak.loadUserProfile().then((profile) => {
        resolve(profile);
      })
      .catch((error) => {
        reject(error);
      });
    });
  }

  /*
    Returns true if the token has less than minValidity seconds left before it expires (minValidity is optional,
    if not specified 0 is used).
  */
  isTokenExpired(minValidity?) {
    return this.keycloak.isTokenExpired(minValidity);
  }

  /*
    If the token expires within minValidity seconds (minValidity is optional, if not specified 5 is used)
    the token is refreshed. If the session status iframe is enabled, the session status is also checked.
    Returns promise to set functions that can be invoked if the token is still valid, or if the token is no longer valid.
    For example:

      keycloak.updateToken(5).then(function(refreshed) {
              if (refreshed) {
                  alert('Token was successfully refreshed');
              } else {
                  alert('Token is still valid');
              }
          }).catch(function() {
              alert('Failed to refresh the token, or the session has expired');
          });
  */
  updateToken(minValidity?): Promise<any> {
    return new Promise((resolve, reject) => {
      this.keycloak.updateToken(minValidity)
        .then(refreshed => {
          resolve(refreshed);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /*
    Clear authentication state, including tokens. This can be useful if application has detected the session was expired,
    for example if updating token fails.
    Invoking this results in onAuthLogout callback listener being invoked.
  */
  clearToken() {
    this.keycloak.clearToken();
  }

  ////////////////
  // PROPERTIES //
  ////////////////

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

  request(method, url): Observable<any> {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.keycloak.token
      }
    };

    return this.httpClient.request(method, url, options);
  }
}
