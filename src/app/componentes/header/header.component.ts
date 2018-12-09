import { Component, OnInit } from '@angular/core';
import { AutenticationService } from './../../servicios/autentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  isLogged: any = false;

  constructor(private authService: AutenticationService) { }

  ngOnInit() {
    this.isCurrentUser();
    if (this.isLogged) {

    }
  }

  isCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        console.log('user logged');
        this.isLogged = true;
      } else {
        console.log('NOT user logged');
        this.isLogged = false;
      }
    });
  }

  onLogout() {
    this.authService.logoutUser();
  }
}
