import { HttpInterceptor } from "@angular/common/http";
import { SessionModel } from './models/response.model';


export class AuthInterceptor implements HttpInterceptor{
    sessionObject:SessionModel;

    intercept(req: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {

        let patternregister=req.url.match("/register");
        let patternloginui=req.url.match("/login");
        let patternlogin=req.url.match("/authenticate");
        console.log("INSIDE interceptor code ");
        if(patternlogin!=null || patternregister!=null || patternloginui!=null || sessionStorage.getItem("verified") === "false" || sessionStorage.getItem("usersession")=== null){
            // || this.sessionObject.token ===null
            // console.log("here i am ");

        }else{
          // console.log("here inside interceptor ");
          this.sessionObject=JSON.parse(sessionStorage.getItem("usersession"));
          // console.log(" hellow "+this.sessionObject.token);
        req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${this.sessionObject.jwttoken}`
            }
          });
        }
        return next.handle(req);
    }


}
