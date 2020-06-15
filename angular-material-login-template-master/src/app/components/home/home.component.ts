import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { environment } from 'src/environments/environment';
import { Users } from 'src/app/models/users-model';

/**
  * @description This class displays customer information and can add beneficiary,transfer amount 
  */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  customerUrl: string;
  user: Users;
  dataSource;
  displayedColumns:string[]=['firstName','email','accountNumber','accountType','currentBalance'];

  /**
  * @description Constructor initializing the properties
  *  @param route
  *  @param dataService
  */
  constructor(private route:Router,private dataService:DataService) { 
    this.customerUrl = `${environment.baseUrl}/bankCustomers`;
    this.user={
      beneficiaries:[],
      firstName:'',
      address:'',
      email:'',
      id:0,
      mobileNumber:'',
      password:'',
      accountNumber: 0,
      accountType:'',
      openingBalance:0,
      currentBalance:0

    };
    
  }

 


  /**
  * @description This method calls a method that fetches details of an user
  */
  ngOnInit(): void {
    this.getDataByUser();
  }

  /**
  * @description This method fetches details of an user by calling service method
  */
 getDataByUser = () => {
    this.dataService.getDataByUser(this.customerUrl,sessionStorage.getItem('email')).subscribe((response:Users) => {
      this.user = response;
      this.dataSource=this.user;
    },
      (error) => {
      },
      () => {

      })
  }

}
