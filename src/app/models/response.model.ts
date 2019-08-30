

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
  jwttoken;
	userid;
	username;
	email;
	completename;
	wallet:Wallet;
	creationDate;
	lose;
	win;


  constructor(jwttoken, userid , username,email,completename,wallet:Wallet,creationDate,lose,win){
      this.username=username;
      this.userid=userid;
      this.jwttoken=jwttoken;
      this.email=email;
      this.completename=completename;
      this.wallet=wallet;
      this.creationDate=creationDate;
      this.lose=lose;
      this.win=win;
  }

}

export class JwtResponse{
  jwttoken;
	userid;
	username;
	email;
	completename;
	wallet:Wallet;
	creationDate;
	lose;
	win;

}

export class Wallet {
  walletid;
  walletmoney;

  constructor(walletid,walletmoney){
    this.walletid=walletid;
    this.walletmoney=walletmoney;
  }
}

//model for categories
export class Category{
  categoryName:string;
  categoryid;
}
