import { Component, OnInit } from '@angular/core';
import { AutenticationService } from '../../../servicios/autentication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CuentaInterface } from 'src/app/modelo/cuenta';

@Component({
  selector: 'app-inises',
  templateUrl: './inises.component.html',
  styleUrls: ['./inises.component.css']
})

export class InisesComponent implements OnInit {
  IniSesForm: FormGroup;
  email: any = '';
  password: any = '';
  cuenta: CuentaInterface = {
    email: '',
    password: '',
  };

  constructor (
    public afAuth: AngularFireAuth,
    private router: Router,
    private authService: AutenticationService,
    private spinnerService: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.IniSesForm = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^.{8,16}$')
      ])),
    });
  }

  onSubmit() {
    this.cuenta = this.saveCuenta();
    this.email = this.cuenta.email;
    this.password = this.cuenta.password;
    this.IniSesForm.reset();
    this.onLogin();
  }

  saveCuenta() {
    const saveCuenta = {
      email: this.IniSesForm.get('email').value,
      password: this.IniSesForm.get('password').value,
    };
    return saveCuenta;
  }

  onLogin() {
    this.authService.emailLogin(this.email, this.password)
    .then((res) => {
      this.spinner();
      this.onLoginRedirect();
    }).catch(err => console.log('err', err.message));
  }

  onLoginGoogle() {
    this.authService.googleLogin()
    .then((res) => {
      this.spinner();
      this.onLoginRedirect();
    }).catch (err => console.log('err', err.message));
  }

  onLogout() {
    this.spinner();
    this.authService.logoutUser();
  }

  onLoginRedirect() {
    this.router.navigate(['addlibro']);
  }

  spinner() {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
    }, 2000);
  }
}
