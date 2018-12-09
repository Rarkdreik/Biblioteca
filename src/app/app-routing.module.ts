import { NgModule } from '@angular/core';
import { AuthGuardService } from './servicios/auth-guard.service';
import { Routes, RouterModule } from '@angular/router';
import { LibroComponent } from './componentes/libro/libro/libro.component';
import { AddlibroComponent } from './componentes/libro/addlibro/addlibro.component';
import { EditlibroComponent } from './componentes/libro/editlibro/editlibro.component';
import { InisesComponent } from './componentes/autentication/inises/inises.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { RegistroComponent } from './componentes/autentication/registro/registro.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'libro', component: LibroComponent },
  { path: 'addLibro', component: AddlibroComponent, canActivate: [AuthGuardService]},
  { path: 'editLibro/:ISBN', component: EditlibroComponent },
  { path: 'iniciosesion', component: InisesComponent },
  { path: 'registro', component: RegistroComponent },
  { path: '**', component: InicioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
