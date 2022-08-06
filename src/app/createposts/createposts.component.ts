import { Component, OnInit } from '@angular/core';
import { HttpClient ,HttpClientModule,HttpHeaders} from '@angular/common/http';
import { FormGroup , FormBuilder , Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-createposts',
  templateUrl: './createposts.component.html',
  styleUrls: ['./createposts.component.css']
})
export class CreatepostsComponent implements OnInit {

  public createpostForm !: FormGroup ;

  constructor(private formbuilder : FormBuilder, private http : HttpClient , private router : Router) { }

  ngOnInit(): void {
    this.createpostForm= this.formbuilder.group({
      text :[''],
      image:[''],
      likes : [0],
      tags  : ['notags'],
      owner :['']
    })
  }
  onPostClick(commentInput :HTMLTextAreaElement){
    let httpHeaders = new HttpHeaders({'app-id':'62ea20e14641344f73b0b152'});
    let url = "https://dummyapi.io/data/v1/post/create";
    try{
      this.http.post<any>(url, this.createpostForm.value,{headers:httpHeaders} )
      .subscribe(res=>{
        console.log(res)
        alert("Post Done");
        this.createpostForm.reset(); 
        this.router.navigate(['dashboard']);
      })
    }catch(err:any){
        console.log(err.message); 
    }  
  }

}
