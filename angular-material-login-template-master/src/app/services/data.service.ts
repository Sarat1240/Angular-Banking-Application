import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

 /**
  * @description This service can do crud operations
  */
@Injectable({
  providedIn: 'root'
})
export class DataService {

  /**
  * @description Constructor injected HttpClient
  *  @param http
  */
  constructor(private http: HttpClient) { }

  /**
  * @description This method validates user login
  * @param url
  * @param email
  * @param password
  */
  validateLogin = (url:string, email:string, password:string) => {
    return this.http.get(url + "?email=" + `${email}` + "&password=" + `${password}`);
    //return this.http.get(url + "?email=" + email + "&password=" + password);
  }
  /**
  * @description This method fetches data for a given url
  * @param url
  */
  getData = (url:string) => {
    return this.http.get(url);
  }

  /**
  * @description This method fetches data for a given url and user
  * @param url
  * @param email
  */
 getDataByUser = (url:string,email:string) => {
  return this.http.get(url + "?email=" + `${email}`);
  }

  /**
  * @description This method posts data 
  * @param url
  * @param postObj
  */
  addData = (url:string,postObj) => {
    return this.http.post(url,postObj);
  }

  /**
  * @description This method updates data 
  * @param url
  * @param putObj
  */
  updateData = (url:string, putObj) => {
    console.log("in updateData",JSON.stringify(putObj));
    return this.http.put(url, JSON.stringify(putObj),{headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }

  /**
  * @description This method deletes data 
  * @param id
  */
  deleteData = (id:string) => {
    return this.http.delete(id);
  }





}
