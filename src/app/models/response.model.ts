

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

export class RegistrationModel{
  username;
  password;
  email;
  completeName;

  constructor(username,password,email,completename){
    this.username=username;
    this.password=password;
    this.email=email;
    this.completeName=completename;
  }
}

export class LoginModel{
  username;
  password;

  constructor(username,password){
    this.username=username;
    this.password=password;
  }

}

//model for Session Object
export class SessionModel{
  token;
  username;
  userid;


  constructor(token, userid , username){
      this.username=username;
      this.userid=userid;
      this.token=token;
  }

}

export class JwtResponse{
  userid;
  token;
}
