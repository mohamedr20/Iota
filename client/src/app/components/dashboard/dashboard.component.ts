import { Component,Input,OnInit,ViewEncapsulation } from '@angular/core';
import {SpotifyService} from '../../services/spotify.service';
import {Http,Response,Headers,RequestOptions} from '@angular/http';


   class PlayList{
    name:string;
    imageUrl:string;
    id:string;
    tracksUrl:string;

    constructor(obj?:any){
      this.name = obj && obj.name || null;
      this.id = obj && obj.id || null;
      this.imageUrl = obj && obj.imageUrl || null;
      this.tracksUrl = obj && obj.tracksUrl || null;
    }
  }


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  data:any;
  loading:boolean;
  spotify_token:any;


  constructor(private spotify:SpotifyService,private http:Http) { }

  ngOnInit() {
    this.getSpotifyToken();
  }

  // getData():void{
  //   this.spotify.getAuthToken()
  //     .subscribe((res:Response)=>{
  //       this.data = res.json()
  //       this.loading = true;
  //       console.log(this.data)
  //     })
  // }

  getSpotifyToken():void{
    this.loading = true;
    this.http.request('http://localhost:8080/spotify/auth')
      .subscribe((res:Response)=>{
        this.data = res.json()
        localStorage.clear();
        this.spotify_token = Object.keys(this.data).map(k => this.data[k])[0];
        localStorage.setItem('spotify_auth',this.spotify_token);
        this.loading = false;
      })
  }
  // getData():void{
  //   this.loading = true;
  //   this.http.request('http://localhost:8080/spotify/auth')
  //     .subscribe((res:Response)=>{
  //       this.data = res.json()
  //       localStorage.clear();
  //       console.log(Object.keys(this.data).map(k => this.data[k])[0]);
  //       this.spotify_token = Object.keys(this.data).map(k => this.data[k])[0];
  //       localStorage.setItem('spotify_auth',this.spotify_token);
  //       this.loading = false;
  //     })
  // }


  // getTaniaTracks():void{
  //   this.loading  = true;
  //   let headers = new Headers();
  //   headers.append('Authorization','Bearer '+localStorage.getItem('spotify_auth'));
  //   this.http.request('https://api.spotify.com/v1/search?q=tania%20bowra&type=track',{headers:headers})
  //     .subscribe((res:Response)=>{
  //       this.data = res.json()
  //       this.playlist = Object.keys(this.data).map(k=>this.data[k]);
  //       console.log(this.playlist);
  //       console.log(this.playlist[0].items)
  //       console.log(this.playlist[0].items[0].album.images[0].url)
  //       this.loading = false;
  //     })
  // }



        // this.playlist = Object.keys(this.data).map(k=>this.data[k])
        // this.results = this.playlist[1].items
        // console.log(this.playlist);
        // console.log(this.results);
        // this.loading = false; 
  }


