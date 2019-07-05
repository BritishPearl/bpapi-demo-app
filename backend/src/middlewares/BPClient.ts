import * as ClientOAuth2 from 'client-oauth2';
import TokenStore from '../models/TokenStore';
import * as request from 'request';

class BPClient {

  public baseUri: string = 'https://bpapi.britishpearl.com';

  private revokeTokenUri = 'https://bpapi.britishpearl.com/oauth2/revoke';
  private clientId: string = process.env.BPAPI_CLIENT_ID!!;
  private clientSecret: string = process.env.BPAPI_CLIENT_SECRET!!;

  private client = new ClientOAuth2({
    authorizationUri: 'https://authorize.britishpearl.com/auth',
    accessTokenUri: 'https://bpapi.britishpearl.com/oauth2/access_token',
    clientId: this.clientId,
    clientSecret: this.clientSecret,
    redirectUri: process.env.BPAPI_REDIRECT_URI || 'https://demo-api.britishpearl.dev/cb-bpapi',
    scopes: ['read:account', 'read:investment-summary'],
  });

  public authenticationUri(): string {
    const state = [...Array(32)].map((i) => (~~(Math.random() * 36)).toString(36)).join('');
    return this.client.code.getUri({ state });
  }

  public async retrieveToken(originalUrl: string, userId: number) {
    return this.client.code.getToken(originalUrl).then((user) => {
      return Promise.resolve(TokenStore.setToken(userId, user));
    });
  }

  public async loadToken(userId: number): Promise<undefined | ClientOAuth2.Token> {
    const storedToken = TokenStore.getToken(userId);

    if (storedToken && storedToken.expired()) {
      storedToken.refresh().then((newToken) => {
        TokenStore.setToken(userId, newToken);
        return Promise.resolve(newToken);
      });
      return Promise.resolve(undefined);
    } else { // storedToken undefined or non-expired
      return Promise.resolve(storedToken);
    }
  }

  public async revokeToken(userId: number): Promise<void> {
    const storedToken = TokenStore.getToken(userId);

    if (storedToken) {
      const options = {
        url: this.revokeTokenUri,
        method: 'POST',
        json: {
          client_id: this.clientId,
          client_secret: this.clientSecret,
          refresh_token: storedToken.refreshToken,
        },
      };
      request(options, (err, response, body) => {
        if (err) {
          return Promise.reject(err);
        } else {
          TokenStore.removeToken(userId);
          return Promise.resolve();
        }
      });
    } else { // storedToken undefined
      return Promise.resolve();
    }
  }
}

export default new BPClient();
