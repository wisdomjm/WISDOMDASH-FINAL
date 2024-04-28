import { Component } from '@angular/core';

import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  email: any;
  password: any;
  
  constructor(
    public AutenticationUser: AuthenticationService,
    
  ) {}



}
