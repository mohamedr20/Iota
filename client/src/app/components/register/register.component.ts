import { Component, OnInit } from '@angular/core';
import {FormGroup,Validators,FormControl} from '@angular/forms';
import {User} from '../../models/user.model'
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  // Refactor register Component to use Reactive Forms

  myForm:FormGroup;
  constructor(private router:Router,private authService:AuthService) { }


  ngOnInit() {
    this.myForm = new FormGroup({
      name: new FormControl(null,Validators.required),
      username: new FormControl(null,Validators.required),
      password: new FormControl(null,Validators.required),
      email:new FormControl(null,[Validators.required,Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")])
    })
  }

  onRegisterSubmit(){
    let user = new User(
      this.myForm.value.email,
      this.myForm.value.password,
      this.myForm.value.username,
      this.myForm.value.name
    )
    this.authService.registerUser(user)
    .subscribe(data=>{
      if(data.success){
        console.log(data)
        this.router.navigate(['/login'])
      }
      else{
        this.router.navigate(['/register'])
      }
    })
  }
}
