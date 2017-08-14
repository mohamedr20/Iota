
import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import {FormGroup,Validators,FormControl} from '@angular/forms';
import {User} from '../../models/user.model'
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  myForm:FormGroup;
  username:String;
  password:String;

  constructor(private router:Router,private authService:AuthService) { }

  ngOnInit() {
    this.myForm = new FormGroup({
            username:new FormControl(null,Validators.required),
            password:new FormControl(null,Validators.required)
    })
  }


  onLoginSubmit(){
    let user = {
      username:this.myForm.value.username,
      password:this.myForm.value.password
    }
    this.authService.authenticateUser(user)
    .subscribe(data=>{
      if(data.success){
        console.log('Log in is a succes')
        this.authService.storeUserData(data.token,data.user)
        this.router.navigate(['/dashboard'])
      }
      else{
        console.log('Unable to log in')
        this.router.navigate(['/login'])
      }
    })
  }



}
