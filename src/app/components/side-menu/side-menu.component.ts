import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
  
})


export class SideMenuComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  public dashboard(){
    this.router.navigate(['/dashboard']);
  }

  public addNewContent(){
    this.router.navigate(['/addcontent']);
  }

  public listUsers(){
    this.router.navigate(['/users'])
  }

  public paymentList(){
    this.router.navigate(['/paymentsys'])
  }

  public messagesList(){
    this.router.navigate(['/messages'])
  }

}
