import { Component, OnInit,Inject } from '@angular/core';
import {Dish} from '../shared/dish'
import {DishService} from '../services/dish.service';
import {Promotion} from '../shared/promotion'
import {PromotionService} from '../services/promotion.service';
import {LeaderService} from '../services/leader.service';
import {leader} from '../shared/leader';
import {flyInout,expand} from '../animations/app.animation'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host:{
    '[@flyInout]':'true',
    'style':'display:block;'
  },
  animations:[
    flyInout(),
    expand()
  ]
})
export class HomeComponent implements OnInit {
  dish:Dish ;
promotion:Promotion;
dishErr:String;
leadErr:string;
promoErr:string
Leader:leader;
  constructor(private dishService:DishService,
    private promotionService:PromotionService,
    private leaderService:LeaderService,
    @Inject('BaseURL')private BaseURL) {
            
     }

  ngOnInit(): void {
    this.dishService.getFeaturedDish().subscribe((dishes)=>this.dish=dishes,dishErr=>this.dishErr=<any>dishErr);
    this.promotionService.getFeaturedPromotion().subscribe((promotion)=>this.promotion=promotion,promoErr=>this.promoErr=<any>promoErr);
    this.leaderService.getFeaturedLeader().subscribe((Leader)=>this.Leader=Leader,leadErr=>this.leadErr=<any>leadErr);
  }
  
}
