import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { LibroService } from '../../../servicios/libro.service';
import { LibroInterface } from '../../../modelo/libro';

@Component({
  selector: 'app-addlibro',
  templateUrl: './addlibro.component.html',
  styleUrls: ['./addlibro.component.css']
})

export class AddlibroComponent implements OnInit {
  libroForm: FormGroup;
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

  constructor( private libroService: LibroService ) { }

  ngOnInit() {
    this.libroForm = new FormGroup({
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
    this.onChanges();
  }

  onChanges(): void {
    this.libroForm.valueChanges.subscribe(valor => {
      this.ejemplar = valor.ejemplares;
      this.prestado = valor.prestados;
      this.libroForm.value.ejemplaresDisponibles = this.ejemplar - this.prestado;
      this.ejemplaresDisponibles = this.libroForm.value.ejemplaresDisponibles;    });
  }

  onSubmit() {
    this.libro = this.saveLibro();
    this.libroService.anadirLibro( this.libro );
    this.libroForm.reset();
  }

  saveLibro() {
    const saveLibro = {
      ISBN: this.libroForm.get('ISBN').value,
      editorial: this.libroForm.get('editorial').value,
      edicion: this.libroForm.get('edicion').value,
      titulo: this.libroForm.get('titulo').value,
      autor: this.libroForm.get('autor').value,
      genero: this.libroForm.get('genero').value,
      ejemplares: this.libroForm.get('ejemplares').value,
      prestados: this.libroForm.get('prestados').value,
      ejemplaresDisponibles: this.ejemplaresDisponibles,
    };
    return saveLibro;
  }

  add_ejemplares() {
    if (this.libroForm.value.ejemplares >= 0) {
      this.ejemplar = this.libroForm.value.ejemplares = this.libroForm.value.ejemplares + 1;
      this.libroForm.patchValue({ejemplares: this.ejemplar});
    }
  }

  less_ejemplares() {
    if (this.libroForm.value.ejemplares > this.libroForm.value.prestados) {
      this.ejemplar = this.libroForm.value.ejemplares = this.libroForm.value.ejemplares - 1;
      this.libroForm.patchValue({ejemplares: this.ejemplar});
    }
  }

  add_prestados() {
    if (this.libroForm.value.prestados >= 0 && this.libroForm.value.prestados < this.ejemplar) {
      this.prestado = this.libroForm.value.prestados = this.libroForm.value.prestados + 1;
      this.libroForm.patchValue({prestados: this.prestado});
    }
  }

  less_prestados() {
    if (this.libroForm.value.prestados > 0) {
      this.prestado = this.libroForm.value.prestados = this.libroForm.value.prestados - 1;
      this.libroForm.patchValue({prestados: this.prestado});
    }
  }
}
