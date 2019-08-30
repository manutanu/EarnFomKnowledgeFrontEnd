import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {
  usersNameList:string[]=[];

  constructor(private http:HttpClient) {

  }

  fetchAllUsernames(){

    this.http.get(environment.urlstring+"/getAllUsernames").pipe(map(data=>{
      for(let ii in data){
        for(let names in data[ii]){
          this.usersNameList.push(data[ii][names]);
        }
      }

      sessionStorage.setItem("usernamesList",JSON.stringify(this.usersNameList));
    },error=>{

    })).subscribe();

  }


}
