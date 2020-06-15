import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
* @description This service can do crud operations on bank customer 
*/
@Injectable({
  providedIn: 'root'
})
export class BankService {

  /**
  * @description Constructor injected HttpClient
  *  @param http
  */
  constructor(private http: HttpClient) { }



  /**
  * @description This method credits destination account 
  * @param url
  * @param putObj
  */
 creditDestinationAccount = (url:string,putObj) => {
  return this.http.put(url, putObj);
}

/**
* @description This method fetches account details of a customer
* @param url
* @param putObj
*/
findCustomerByAccountnumber = (url:string,accountNumber:number)=>
{
  return this.http.get(url + "?accountNumber=" + `${accountNumber}`);
}  

/**
* @description This method adds beneficiary to the customer
* @param url
* @param obj
*/
addBeneficiary = (url:string,obj)=>
{
  return this.http.put(url,obj);
}

/**
* @description This method fetches account details of a customer
* @param url
* @param putObj
*/
getDataByUser=(url:string,accountNumber:number)=>
{
  return this.http.get(url + "?accountNumber=" + `${accountNumber}`);
}




}
