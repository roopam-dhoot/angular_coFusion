import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {of,Observable, from} from  'rxjs';
import{Feedback} from '../shared/feedback';
import { delay }from 'rxjs/operators';
import {baseURL} from '../shared/baseurl'
import { map,catchError } from 'rxjs/operators';
import {ProcessHTTPMsgService} from '../services/process-httpmsg.service';
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http:HttpClient,
    private processHTTPMsgService:ProcessHTTPMsgService) { }
    putfeedback(Feedback: Feedback): Observable<Feedback> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<Feedback>(baseURL + 'feedback ', Feedback, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }
}
