import { LibroService } from './../../../servicios/libro.service';
import { Component, OnInit } from '@angular/core';
import { LibroInterface } from '../../../modelo/libro';
import { AutenticationService } from 'src/app/servicios/autentication.service';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})
export class LibroComponent implements OnInit {
  libros: any[] = [];
  libro: LibroInterface = {
    ISBN: '',
    editorial: '',
    edicion: '',
    titulo: '',
    autor: '',
    genero: '',
    ejemplares: 0,
    prestados: 0,
    ejemplaresDisponibles: 0,
  };

  isLogged: any = false;

  constructor(private librosService: LibroService, private authService: AutenticationService) {
    this.librosService.getLibros()
    .subscribe(libros => {
      libros.forEach(libro => {
        this.libros.push(libro);
      });
    });
  }

  ngOnInit() {
    this.isCurrentUser();
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

  eliminarLibro(libro: LibroInterface) {
    this.librosService.eliminarLibro(libro);
  }
}
