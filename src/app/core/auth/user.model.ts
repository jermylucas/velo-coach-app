export class User {
  constructor(
    public email: string,
    public id: string,
    public displayName: string,
    // tslint:disable: variable-name
    private _token,
    private _tokenExpirationDate: Date
  ) {}

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}
