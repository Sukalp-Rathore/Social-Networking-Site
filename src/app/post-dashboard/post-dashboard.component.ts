import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatepostsComponent } from '../createposts/createposts.component';
import { Route, Router } from '@angular/router';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.css'],
})
export class PostDashboardComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private route: Router
  ) {}

  public postData: any;
  public otherUserPost: any;

  ngOnInit(): void {
    let getUserData = JSON.parse(
      localStorage.getItem('userData') || 'no user founds'
    );
    console.log('user id ' + getUserData.id);

    let httpHeaders = new HttpHeaders({ 'app-id': '62ea20e14641344f73b0b152' });
    let url = `https://dummyapi.io/data/v1/user/${getUserData.id}`;
    try {
      this.http.get<any>(url, { headers: httpHeaders }).subscribe((res) => {
        console.log(res);
      });
    } catch (err: any) {
      console.log(err.message);
    }
    let url1 = 'https://dummyapi.io/data/v1/post?limit=100';
    try {
      this.http.get<any>(url1, { headers: httpHeaders }).subscribe((res) => {
        // console.log(JSON.stringify(res));
        // localStorage.setItem('allPostData', JSON.stringify(res));
        this.postData = res.data;
        console.log('====vvv=>', this.postData);
      });
    } catch (err: any) {
      console.log(err.message);
    }
  }
  onCreatePostClick() {
    this.dialog.open(CreatepostsComponent);
  }
  onClickLike() {}
  clickUserDetails() {
    this.route.navigate(['userdetails']);
  }
}
