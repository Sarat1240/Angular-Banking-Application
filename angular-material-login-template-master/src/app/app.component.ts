import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-material-login-template';

  /**
  * @description Constructor initializing the properties
  *  @param route
  */
  constructor(private route:Router) {
   }

   /**
  * @description This method stores the email 
  */
  ngOnInit(): void {
    
    
  }

  /**
  * @description This method logs out of the application
  */
  logout=()=>
  {
    this.route.navigate(['/login']);;
  }
}
