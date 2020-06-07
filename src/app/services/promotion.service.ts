import { Injectable } from '@angular/core';
import {Promotion} from '../shared/promotion';

import { resolve } from 'dns';
import { promise } from 'protractor';
import { of ,Observable} from 'rxjs';
import { delay } from 'rxjs/operators';
import {baseURL} from '../shared/baseurl'
import { map } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http:HttpClient) { }
  getPromotions():Observable<Promotion[]>{
    return this.http.get<Promotion[]>(baseURL+'promotions')
      }
      getPromotion(id:String):Observable<Promotion>{
        return this.http.get<Promotion>(baseURL+'promotions/'+id)
        }
  
  
      getFeaturedPromotion():Observable<Promotion>{
        return this.http.get<Promotion[]>(baseURL+'promotions?featured=true').pipe(map(promotions=>promotions[0]));
      }
    }

