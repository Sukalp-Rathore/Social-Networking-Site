import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../app/users.service'
import { FormGroup , FormBuilder , Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { HttpClient ,HttpClientModule,HttpHeaders} from '@angular/common/http';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public signinForm !: FormGroup ;

  constructor(private auth :UsersService ,private formbuilder : FormBuilder, private http : HttpClient , private router : Router) { }

  ngOnInit(): void {
    this.signinForm  = this.formbuilder.group({
      firstName : ['fname'],
      lastName :['lname'],
      email :['', Validators.required]
    })
  }

  signInWithGoogle(){
    this.auth.googleSignIn();
  }


  signIn(){
    let httpHeaders = new HttpHeaders({'app-id':'62ea20e14641344f73b0b152'});
    let url = "https://dummyapi.io/data/v1/user/create";
    try{
      this.http.post<any>(url, this.signinForm.value,{headers:httpHeaders} )
      .subscribe(res=>{
        console.log(res)
        alert("LogIn Successfull");
        this.signinForm.reset(); 
        this.router.navigate(['dashboard']);
      })
    }catch(err:any){
        alert("Check credentials");
        console.log(err.message);
    }
    
  }

}


