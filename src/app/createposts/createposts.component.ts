import { Component, OnInit } from '@angular/core';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';

import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-createposts',
  templateUrl: './createposts.component.html',
  styleUrls: ['./createposts.component.css'],
})
export class CreatepostsComponent implements OnInit {
  public createpostForm!: FormGroup;
  id!: string;
  firstName!: string;
  lastName!: string;

  constructor(
    private formbuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    let getUserData = JSON.parse(
      localStorage.getItem('userData') || 'no user founds'
    );
    this.createpostForm = this.formbuilder.group({
      text: '',
      image: 'https://wallpaperaccess.com/full/492999.jpg',
      likes: 0,
      tags: '',
      owner: getUserData.id,
    });

    console.log('user id ' + getUserData.id);
    console.log('user fName ' + getUserData.firstName);
    console.log('user lName ' + getUserData.lastName);
    this.firstName = getUserData.firstName;
    this.lastName = getUserData.lastName;
    this.id = getUserData.id;
  }
  onPostClick() {
    console.log('=========>', this.createpostForm);

    let httpHeaders = new HttpHeaders({ 'app-id': '62ea20e14641344f73b0b152' });
    let url = 'https://dummyapi.io/data/v1/post/create';
    try {
      // console.log(this.createpostForm);
      this.http
        .post<any>(url, this.createpostForm.value, { headers: httpHeaders })
        .subscribe((res) => {
          console.log(res);
          console.log('data sent successfulll ======>');
          alert('Post Done');
          this.createpostForm.reset();
          this.router.navigate(['dashboard']);
        });
    } catch (err: any) {
      console.log(err.message);
    }
  }

  clickExit() {
    this.router.navigate(['dashboard']);
  }
}
