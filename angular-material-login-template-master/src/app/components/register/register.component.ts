import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/users-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BankService } from 'src/app/services/bank.service';

/**
  * @description This class enables customer to add a beneficiary
  */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {


  registerForm:FormGroup;
  submitted:boolean;
  user :any ;
  baseUrl:string;
  userAccountNumber:number;


  /**
  * @description Constructor initializing the properties
  *  @param dataService
  *  @param route
  *  @param bankService
  */
  constructor(private dataService:DataService,private route:Router,private bankService:BankService) {
      this.submitted = false;
      this.baseUrl = `${environment.baseUrl}/bankCustomers`;
   }
  /**
  * @description This method adds validators the form
  */
  ngOnInit(): void {
    this.registerForm = new FormGroup(
      {
        accountNumber: new FormControl('',[Validators.required,Validators.maxLength(12)])

      }
    )
    this.dataService.getDataByUser(`${environment.baseUrl}/bankCustomers`,sessionStorage.getItem("email"))
    .subscribe((response:Users)=>{
       this.user = response;
       this.userAccountNumber =  this.user[0].accountNumber
    },
    (error)=>{
 
    },
    ()=>{

    });
  }

  /**
  * @description This method validates the form, and upon successful validation calls a method to register user
  * @param accountNumber
  */
  submit=(accountNumber)=>
  {
    this.submitted = true;
    if(this.registerForm.valid)
    {
       this.registerBeneficiary(accountNumber);
    }
  }

  /**
  * @description This method registers a customer as beneficiary
  * @param accountNumber
  */
 registerBeneficiary=(accountNumber)=>
  {
    this.bankService.findCustomerByAccountnumber(`${this.baseUrl}`,accountNumber).subscribe((response:Users)=>{
      let output = response;
      if(output[0]===undefined)
      {
        alert("Given Account Number doesn't exist to add as a beneficiary");
        return;
      } 
      else{
        let loggedInUser = this.user;
        loggedInUser[0].beneficiaries.push(accountNumber);

        this.bankService.addBeneficiary(`${this.baseUrl}/${this.user[0].id}`,loggedInUser[0]).subscribe((response)=>{ 
        alert("Beneficiary added successfully");
        
        },
        (error)=>{
        },
        ()=>{
    
        })
      }
    },
    (error)=>{
    },
    ()=>{

    })
  }
 /**
  * @description This method navigates customer to the home page
  */
  back=()=>
  {
    this.route.navigate(['/home']);;
  }



}