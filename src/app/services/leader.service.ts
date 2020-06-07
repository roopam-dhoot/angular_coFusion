import { Injectable } from '@angular/core';
import {leader} from '../shared/leader';
import {of, pipe,Observable} from  'rxjs';
import { delay }from 'rxjs/operators';
import {baseURL} from '../shared/baseurl'
import { map } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http:HttpClient) { }
  getLeader():Observable<leader[]>{
    return this.http.get<leader[]>(baseURL+'leadership')
  
     
  }
  getFeaturedLeader():Observable<leader>{
    return this.http.get<leader[]>(baseURL+'leadership?featured=true').pipe(map(leadership=>leadership[0]));
   
    
  }
}
