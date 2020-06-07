import { Component, OnInit,ViewChild } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';
import {Feedback,ContactType} from '../shared/feedback';
import {FeedbackService} from '../services/feedback.service'
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {


  FeedbackForm:FormGroup;
  feedback:Feedback;
  contactType = ContactType;
  feedbackcopy:Feedback;
  errMess:string;
  spinnerVisibility: boolean = false;

  @ViewChild('fform') feedbackFormDirective;
  formErrors={
  'firstname':'',

};
ValidationMessages={
'Firstname':{
  'required':'First name is required.',
  'minlength':'First name must be at least 2 char long',
  'maxlength': 'First name must be atmost 25 char long'
},
'message':{
  'required':'message  is required.',
  'minlength':'message  must be at least 2 char long',
  'maxlength': 'message  must be atmost 25 char long'
}

}
  constructor(public fb:FormBuilder,
    public feedbackService:FeedbackService ) {
    this.creaetForm();
   }

  ngOnInit(): void {
  }
  creaetForm(){
     this.FeedbackForm=this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
       agree: false,
      contacttype: 'None',
      message: ['',[Validators.minLength(2), Validators.maxLength(25)]],
      rating:'5'
    });
     this.FeedbackForm.valueChanges.subscribe(data=>this.onValueChanged(data))
     this.onValueChanged()//reset form message validation message
      
     }
 
     onValueChanged(data?: any) {
      if (!this.FeedbackForm) { return; }
      const form = this.FeedbackForm;
      for (const field in this.formErrors) {
        if (this.formErrors.hasOwnProperty(field)) {
          // clear previous error message (if any)
          this.formErrors[field] = '';
          const control = form.get(field);
          if (control && control.dirty && !control.valid) {
            const messages = this.ValidationMessages[field];
            for (const key in control.errors) {
              if (control.errors.hasOwnProperty(key)) {
                this.formErrors[field] += messages[key] + ' ';
              }
            }
          }
        }
      }
    }

    onSubmit() {
      this.spinnerVisibility = true;
    this.feedback = this.FeedbackForm.value;
    this.feedbackcopy=this.FeedbackForm.value;
 
    console.log(this.feedbackcopy);
this.feedbackService.putfeedback(this.feedbackcopy)
.subscribe(feedback=>{
  this.feedback=feedback;
  this.feedbackcopy=this.feedbackcopy
  this.spinnerVisibility = false
  setTimeout(() => this.feedback = null, 5000);
}
,errMess=>{
  this.feedbackcopy=null;
  this.errMess=<any>errMess;
  this.spinnerVisibility = false
})
  
    this.FeedbackForm.reset({
      firstname:'',
      rating:'5',
      agree:false,
      contactType:'None',
      message:''
    });
    this.feedbackFormDirective.resetForm();
  }

}
