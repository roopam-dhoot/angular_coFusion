import { Component, OnInit,Inject } from '@angular/core';
import {LeaderService} from '../services/leader.service';
import {leader} from '../shared/leader';  
import {flyInout} from '../animations/app.animation'
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host:{
    '[@flyInout]':'true',
    'style':'display:block;'
  },
  animations:[
    flyInout()
  ]
})

export class AboutComponent implements OnInit {
leader:leader[]
  constructor(private leaderService:LeaderService, 
     @Inject('BaseURL')private BaseURL) { }

  ngOnInit(): void {
    this.leaderService.getLeader().subscribe((leader)=>this.leader=leader);
  
  }

}
