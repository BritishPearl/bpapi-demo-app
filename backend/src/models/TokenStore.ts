import { Token } from 'client-oauth2';

class TokenStore {
  // user id -> Token
  private tokens = new Map<number, Token>();

  public setToken(userId: number, token: Token) {
    this.tokens.set(userId, token);
  }

  // retrieve user from db by ID
  public getToken(userId: number): undefined | Token {
    return this.tokens.get(userId);
  }

  public removeToken(userId: number): void {
    this.tokens.delete(userId);
  }
}

export default new TokenStore();
