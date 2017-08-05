import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import {Router,NavigationStart,NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation:ViewEncapsulation.None

})
export class HomeComponent implements OnInit {

  mybool:boolean;
  constructor(private router: Router) {};

 ngOnInit(){
     if(this.router.url === '/login'){
       console.log(this.router.url);
     }
 }

  getRandomColor() {
  setTimeout(function(){
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    console.log(color)
    return color;
  },5000)

}
}
