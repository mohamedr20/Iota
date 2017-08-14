import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import {SpotifyService} from '../../services/spotify.service';
import {Http,Response,Headers,RequestOptions} from '@angular/http';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  data:Object;
  loading:boolean;
  constructor(private spotify:SpotifyService,private http:Http) { }

  ngOnInit() {
  }

  // getData():void{
  // 	this.spotify.getAuthToken()
  // 	.subscribe((res:Response)=>{
  //     console.log(data);
  // 		data= this.token;
  // 	})
  // }

  getData():void{
    this.loading = true;
    this.http.request('http://localhost:8080/spotify/auth')
      .subscribe((res:Response)=>{
        this.data = res.json();
        this.loading = false;
      })
  }
}
