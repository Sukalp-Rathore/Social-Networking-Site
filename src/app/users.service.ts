import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule,HttpHeaders} from '@angular/common/http';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import {GoogleAuthProvider} from '@angular/fire/auth'


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http : HttpClient, private fireauth : AngularFireAuth,private router : Router) { }

  getData(){
    let httpHeaders = new HttpHeaders({'app-id':'62ea20e14641344f73b0b152'});
    let url = "https://dummyapi.io/data/v1/user";
    let res:any = this.http.get(url ,{headers:httpHeaders});
    if(res){
      // console.log(res)
      const {id,name,email} = res;
      console.log("=====>",id);
      console.log("=====>",name);
      console.log("=====>",email);
    return res;

    }
  }



  googleSignIn(){
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then( res => {
      this.router.navigate(['/dashboard']);
      localStorage.setItem('token',JSON.stringify(res.user?.uid));
    },err =>{
      alert(err.message);
    })
  }
}
