import { Component, OnInit ,Input,Inject} from '@angular/core';
import {Dish} from '../shared/dish';
import { Params,ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import {DishService} from '../services/dish.service';
import {switchMap} from 'rxjs/operators';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';
import {Comment} from '../shared/comment'
import {visibility,flyInout,expand} from '../animations/app.animation';
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host:{
    '[@flyInout]':'true',
    'style':'display:block;'
  },
  animations:[
    flyInout(),
    visibility(),
    expand()
  ]

})
export class DishdetailComponent implements OnInit {
 
  
dish:Dish  
 dishIds:string[];
 prev:string;
 errMess:string;
 next:string;
dishcopy:Dish;
 CommentForm:FormGroup;
 comment:Comment;
 visibility = 'shown';

 formErrors = {
  'author': '',
  'comment': ''
};

validationMessages = {
  'author': {
    'required':      'Author Name is required.',
    'minlength':     'Author Name must be at least 2 characters long.',
    'maxlength':     'Author Name cannot be more than 25 characters long.'
  },
  'comment': {
    'required':      'Comment is required.',
    'minlength':     'Comment must be at least 1 characters long.'
  }
};


  constructor(private dishservice:DishService,
    private route:ActivatedRoute,
    public fb:FormBuilder,
    private location:Location,
    @Inject('BaseURL')private BaseURL) {
      this.createForm()
     }
    

  
  // this.CommentForm.valueChanges.subscribe(data=>this.onValueChanged(data))
  // this.onValueChanged()//reset form message validation message

  ngOnInit(): void {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds,errMess=>this.errMess=<any>errMess);
    this.route.params.pipe(switchMap((params: Params) =>  { this.visibility = 'hidden';return this.dishservice.getDish(params['id']);} ))
    .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevnext(dish.id); this.visibility = 'shown'; },
      errmess => this.errMess = <any>errmess);
  }
  setPrevnext(dishId:string){
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }
goBack():void{
  this.location.back();
}

createForm() {
  this.CommentForm = this.fb.group({
    author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
    comment: ['', [Validators.required, Validators.minLength(1)] ],
    rating: 5
  });
this.CommentForm.valueChanges
.subscribe(data => this.onValueChanged(data));

this.onValueChanged(); // (re)set validation messages now
}

onValueChanged(data?: any) {
if (!this.CommentForm) { return; }
const form = this.CommentForm;
for (const field in this.formErrors) {
  // clear previous error message (if any)
  this.formErrors[field] = '';
  const control = form.get(field);
  if (control && control.dirty && !control.valid) {
    const messages = this.validationMessages[field];
    for (const key in control.errors) {
      this.formErrors[field] += messages[key] + ' ';
    }
  }
}
this.comment = form.value;
}

onSubmit() {
this.comment = this.CommentForm.value;
this.comment.date = new Date().toISOString();
this.dishcopy.comments.push(this.comment);
this.dishservice.putDish(this.dishcopy)
.subscribe(dish=>{
  this.dish=dish;
  this.dishcopy=this.dishcopy
},errMess=>{
  this.dish=null;
  this.dishcopy=null;
  this.errMess=<any>errMess;
})
console.log(this.comment);
this.comment = null;
this.CommentForm.reset({
  author: '',
  comment: '',
  rating: 5
});
}

}
