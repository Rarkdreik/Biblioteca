import { Injectable } from '@angular/core';
import { LibroInterface } from '../modelo/libro';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators/';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  librosColecciones: AngularFirestoreCollection<LibroInterface>;
  librosColecciones2: AngularFirestoreCollection<LibroInterface>;
  libros: Observable<LibroInterface[]>;
  libro: LibroInterface;
  librosDoc: AngularFirestoreDocument<LibroInterface>;

  /*
  * Conexión a la base de datos
  * Devuelve el ISBN y todos sus datos
  */
  constructor(public db: AngularFirestore) {
    this.librosColecciones = this.db.collection<LibroInterface>('libros');
    this.libros = this.librosColecciones.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as LibroInterface;
        const ISBN = a.payload.doc.id;
        return { ISBN, ...data };
      }))
    );
  }

  getLibros() {
    return this.libros;
  }

  // getLibro(isbn: string) {
  //   console.log('entraaaaaaaaaaaaaaaaaa ' + this.libro);
  //   this.libros.subscribe(libros => {
  //       libros.forEach(libro => {
  //         if (libro.ISBN === isbn) {
  //           return this.libro = libro;
  //           console.log('aquiiiiiiiiiiiiiiiiii ' + this.libro);
  //         }
  //       });
  //   });

  //   this.libros.toPromise();

  //   console.log('aaaaaaaaaaaaaaaaaaaaaa ' + this.libro);
  // }

  eliminarLibro(libro: LibroInterface) {
    this.db.collection('libros').doc(libro.ISBN).delete();
  }

  actualizarLibro(libro: LibroInterface) {
    this.db.collection('libros').doc(libro.ISBN).update({
      editorial: libro.editorial,
      edicion: libro.edicion,
      titulo: libro.titulo,
      autor: libro.autor,
      genero: libro.genero,
      ejemplares: libro.ejemplares,
      prestados: libro.prestados,
      ejemplaresDisponibles: libro.ejemplaresDisponibles,
    });
  }

  anadirLibro(libro: LibroInterface) {
    this.db.collection('libros').doc(libro.ISBN).set({
      editorial: libro.editorial,
      edicion: libro.edicion,
      titulo: libro.titulo,
      autor: libro.autor,
      genero: libro.genero,
      ejemplares: libro.ejemplares,
      prestados: libro.prestados,
      ejemplaresDisponibles: libro.ejemplaresDisponibles,
    });
  }
}
