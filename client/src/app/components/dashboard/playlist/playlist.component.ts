import { Component, OnInit } from '@angular/core';
import {PlayList} from './playlist.model';
import {Http,Headers,Response} from '@angular/http'
import {SpotifyService} from '../../../services/spotify.service'


@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent implements OnInit {
  data:any;
  loading:boolean;
  playlist:any;
  product:any;
  results:any;
  prop:any;
  results_array:string[];

  constructor(private http:Http,private spotify:SpotifyService) { 
  	
  }

  ngOnInit() {
  		this.spotify.getPlaylist()
  }


}
