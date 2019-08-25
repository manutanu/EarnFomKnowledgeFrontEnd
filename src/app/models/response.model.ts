

export class responseModel {
  _message: string;

  get message(): string {
    return this._message;
  }
  set message(value: string) {
    this._message = value;
  }
}


export class errorResponse {
  _message: string;
  _code: number;
  _url: string;

  get message(): string {
    return this._message;
  }
  set message(value: string) {
    this._message = value;
  }

  get code(): number {
    return this._code;
  }
  set code(value: number) {
    this._code = value;
  }

  get url(): string {
    return this._url;
  }
  set url(value: string) {
    this._url = value;
  }

}

