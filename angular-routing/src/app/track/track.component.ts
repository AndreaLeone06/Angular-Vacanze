import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { SpotifyService } from '../spotify.service';
import { Observable } from 'rxjs';
import {Location} from '@angular/common'

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {
  routeObs: Observable<ParamMap>; 
  track : any;
  spotifyServiceObs: Observable<Object>;
  constructor(
    private route: ActivatedRoute, 
    private service: SpotifyService,
    private location: Location  ) { }
  ngOnInit(): void {
    this.routeObs = this.route.paramMap;
    this.routeObs.subscribe(this.getRouterParam);
  }
  getRouterParam = (params: ParamMap) =>
  {
    let trackId = params.get('id');
    console.log (trackId);
    this.spotifyServiceObs = this.service.getTrack(trackId) ;
    this.spotifyServiceObs.subscribe((data)=>this.track = data)
  }
  back() : void
  {
    this.location.back();
  }
}