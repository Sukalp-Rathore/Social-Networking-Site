import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../app/users.service'
// import { signWithGoogle } from '../../services'
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {



  constructor(private auth :UsersService) { }

  ngOnInit(): void {
  }

  signInWithGoogle(){
    this.auth.googleSignIn();
  }

}
