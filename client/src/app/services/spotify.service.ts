import { Injectable } from '@angular/core';
import {Http,Response,Headers} from '@angular/http';
import {Observable} from 'rxjs';
import {PlayList} from '../components/dashboard/playlist/playlist.model';
@Injectable()
export class SpotifyService {
  data:any;
  spotify_token:any;
  loading:boolean;
  playlist:any;
  product:any;
  results:any;
  prop:any;
  results_array:string[];
  constructor(public http:Http) { 
    
  }

  searchByTrack(query: string) {
 let params: string = [
  `q=${query}`,
  `type=track`
  ].join("&");
  let queryURL: string=`https://api.spotify.com/v1/search?${params}`;
  return this.http.request(queryURL).map(res => res.json());
  }

  getAuthToken():any{
    this.http.request('http://localhost:8080/spotify/auth')
      .subscribe((res:Response)=>{
        this.data = res.json()
      })  
  }


    getPlaylist():void{
    this.loading = true;
    let headers = new Headers();
    headers.append('Authorization','Bearer '+localStorage.getItem('spotify_auth'));
    this.http.request('https://api.spotify.com/v1/browse/featured-playlists?country=SE',{headers:headers})
      .subscribe((res:Response)=>{
        this.data = res.json()
        this.playlist = Object.keys(this.data).map(k=>this.data[k])
        this.results = this.playlist[1].items;
        console.log(this.results);
     })
  }


  //Get an several albums
  //Get an Artist
  //Get several artists
  //


    // onLoginSubmit(){
    // let user = {
    //   username:this.myForm.value.username,
    //   password:this.myForm.value.password
    // }
    // this.authService.authenticateUser(user)
    // .subscribe(data=>{
    //   if(data.success){
    //     console.log('Log in is a succes')
    //     this.authService.storeUserData(data.token,data.user)
    //     this.router.navigate(['/dashboard'])
    //   }
    //   else{
    //     console.log('Unable to log in')
    //     this.router.navigate(['/login'])
    //   }
    // })
   
  

    storeSpotifyToken(token){
    this.getAuthToken()
    localStorage.setItem('spotify_token', this.spotify_token);  
  }
}
