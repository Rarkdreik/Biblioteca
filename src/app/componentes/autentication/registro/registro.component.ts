import { AutenticationService } from './../../../servicios/autentication.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { CuentaInterface } from 'src/app/modelo/cuenta';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent implements OnInit {
  IniSesForm: FormGroup;
  email: any = '';
  password: any = '';
  cuenta: CuentaInterface = {
    email: '',
    password: '',
  };

  constructor(private router: Router, private authService: AutenticationService) { }

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
    this.onAddCuenta();
  }

  saveCuenta() {
    const saveCuenta = {
      email: this.IniSesForm.get('email').value,
      password: this.IniSesForm.get('password').value,
    };
    return saveCuenta;
  }

  onAddCuenta() {
    this.authService.emailSignUp(this.email, this.password)
    .then((res) => {
      this.router.navigate(['addlibro']);
    }).catch(err => console.log('err', err.message));
  }
}
