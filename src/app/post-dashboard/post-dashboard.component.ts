import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import { CreatepostsComponent } from '../createposts/createposts.component';


@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.css']
})
export class PostDashboardComponent implements OnInit {

  constructor(private dialog : MatDialog) { }

  ngOnInit(): void {
  }
  onCreatePostClick(){
    this.dialog.open(CreatepostsComponent)
  }


}
