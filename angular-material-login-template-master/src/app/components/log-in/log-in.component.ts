import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { LoginDetails } from 'src/app/models/loginDetails-model';
import { Subscription } from 'rxjs/internal/Subscription';
import { DataService } from 'src/app/services/data.service';
/**
  * @description This class enables to login to the application by validating credentials
  */
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  baseUrl:string;
  subscription:Subscription;
  model:LoginDetails;
  submitted:boolean;  
  

  /**
  * @description Constructor initializing the properties
  *  @param route
  *  @param dataService
  */
  constructor(private route:Router,private dataService:DataService) {
    this.submitted = false;
    this.baseUrl = `${environment.baseUrl}/bankCustomers`;
    this.model = {
      email:'',
      password:''
    }
   }

   ngOnInit(): void {
     sessionStorage.getItem("email");

  }
 /**
  * @description This method validates user login by calling userLogin method
  * @param loginRef
  */
  submit = (loginRef) =>
  {
    this.submitted = true;
    if(loginRef.valid)
      {
        this.loginUser();
        
      }
  }

  /**
  * @description When login button clicked, this method validates user login
  */
  loginUser=()=>
  {
   this.subscription  = this.dataService.validateLogin(this.baseUrl,this.model.email,this.model.password)
    .subscribe((response:Array<any>)=>{
      sessionStorage.setItem("email",this.model.email);
      let responseArrayLength = response.length;
      if(responseArrayLength===1)
      {
        this.route.navigate(['/home']);
      }
      else
      {      
          alert("Invalid Credentials!");
      }
    },
    (error)=>{
 
    },
    ()=>{

    })
  }

 
  
}
