import { HttpClient ,HttpClientModule,HttpHeaders} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder , Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupForm !: FormGroup ;

  constructor(private formbuilder : FormBuilder, private http : HttpClient , private router : Router) { }

  ngOnInit(): void {
    this.signupForm  = this.formbuilder.group({
      firstName :['', Validators.required],
      lastName :['', Validators.required],
      email :['', Validators.required]
    })

    localStorage.setItem('id','')
  }
  signUp(){
    let httpHeaders = new HttpHeaders({'app-id':'62ea20e14641344f73b0b152'});
    let url = "https://dummyapi.io/data/v1/user/create";
    try{
      this.http.post<any>(url, this.signupForm.value,{headers:httpHeaders} )
      .subscribe(res=>{
        console.log(JSON.stringify(res))

        const {id} = res;

        console.log("====>",id);
        
        alert("SignUp Successfull");
        this.signupForm.reset(); 
        this.router.navigate(['dashboard']);
      })
    }catch(err:any){
        console.log(err.message);
    }
    
  }

}
