import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { LibroService } from '../../../servicios/libro.service';
import { LibroInterface } from '../../../modelo/libro';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editlibro',
  templateUrl: './editlibro.component.html',
  styleUrls: ['./editlibro.component.css']
})

export class EditlibroComponent implements OnInit {

  libroEditForm: FormGroup;
  ejemplar: any;
  prestado: any;
  ejemplaresDisponibles: any;
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

  constructor(private pf: FormBuilder,
    private libroService: LibroService,
    private router: Router,
    private activatedRouter: ActivatedRoute) {
    this.activatedRouter.params
      .subscribe(parametros => {
        this.libro.ISBN = parametros['ISBN'];
      });
  }

  ngOnInit() {
    this.libroEditForm = new FormGroup({
      ISBN: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^((?:[\\dX]{13})|(?:[\\d\\-X]{17})|(?:[\\dX]{10})|(?:[\\d\\-X]{13}))$')
      ])),
      editorial: new FormControl('', Validators.required),
      edicion: new FormControl('', Validators.required),
      titulo: new FormControl('', Validators.required),
      autor: new FormControl('', Validators.required),
      genero: new FormControl('', Validators.required),
      ejemplares: new FormControl(0, Validators.min(0)),
      prestados: new FormControl(0, Validators.min(0)),
      ejemplaresDisponibles: new FormControl(0, Validators.min(0)),
    });

    this.libroService.getLibros().subscribe(libros => {
      libros.forEach(libro => {
        if (libro.ISBN === this.libro.ISBN) {
          this.libro = libro;

          this.libroEditForm = new FormGroup({
            ISBN: new FormControl(this.libro.ISBN, Validators.compose([
              Validators.required,
              Validators.pattern('^((?:[\\dX]{13})|(?:[\\d\\-X]{17})|(?:[\\dX]{10})|(?:[\\d\\-X]{13}))$')
            ])),
            editorial: new FormControl(this.libro.editorial, Validators.required),
            edicion: new FormControl(this.libro.edicion, Validators.required),
            titulo: new FormControl(this.libro.titulo, Validators.required),
            autor: new FormControl(this.libro.autor, Validators.required),
            genero: new FormControl(this.libro.genero, Validators.required),
            ejemplares: new FormControl(this.libro.ejemplares, Validators.min(0)),
            prestados: new FormControl(this.libro.prestados, Validators.min(0)),
            ejemplaresDisponibles: new FormControl(this.libro.ejemplaresDisponibles, Validators.min(0)),
          });
          this.onChanges();
        }
      });
    });
  }

  onChanges(): void {
    this.libroEditForm.valueChanges.subscribe(valor => {
      this.ejemplar = valor.ejemplares;
      this.prestado = valor.prestados;
      this.libroEditForm.value.ejemplaresDisponibles = this.ejemplar - this.prestado;
      this.ejemplaresDisponibles = this.libroEditForm.value.ejemplaresDisponibles;
    });
  }

  onSubmit() {
    this.libro = this.saveLibro();
    this.libroService.anadirLibro( this.libro );
    this.libroEditForm.reset();
  }

  saveLibro() {
    const saveLibro = {
      ISBN: this.libroEditForm.get('ISBN').value,
      editorial: this.libroEditForm.get('editorial').value,
      edicion: this.libroEditForm.get('edicion').value,
      titulo: this.libroEditForm.get('titulo').value,
      autor: this.libroEditForm.get('autor').value,
      genero: this.libroEditForm.get('genero').value,
      ejemplares: this.libroEditForm.get('ejemplares').value,
      prestados: this.libroEditForm.get('prestados').value,
      ejemplaresDisponibles: this.ejemplaresDisponibles,
    };
    return saveLibro;
  }

  add_ejemplares() {
    if (this.libroEditForm.value.ejemplares >= 0) {
      this.ejemplar = this.libroEditForm.value.ejemplares = this.libroEditForm.value.ejemplares + 1;
      this.libroEditForm.patchValue({ejemplares: this.ejemplar});
    }
  }

  less_ejemplares() {
    if (this.libroEditForm.value.ejemplares > this.libroEditForm.value.prestados) {
      this.ejemplar = this.libroEditForm.value.ejemplares = this.libroEditForm.value.ejemplares - 1;
      this.libroEditForm.patchValue({ejemplares: this.ejemplar});
    }
  }

  add_prestados() {
    if (this.libroEditForm.value.prestados >= 0 && this.libroEditForm.value.prestados < this.ejemplar) {
      this.prestado = this.libroEditForm.value.prestados = this.libroEditForm.value.prestados + 1;
      this.libroEditForm.patchValue({prestados: this.prestado});
    }
  }

  less_prestados() {
    if (this.libroEditForm.value.prestados > 0) {
      this.prestado = this.libroEditForm.value.prestados = this.libroEditForm.value.prestados - 1;
      this.libroEditForm.patchValue({prestados: this.prestado});
    }
  }
}
