import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from './../environments/environment';

import { NgxSpinnerModule } from 'ngx-spinner';

import { NotifyService } from './servicios/notify.service';
import { AuthGuardService } from './servicios/auth-guard.service';

// Componentes
import { AppComponent } from './app.component';
import { LibroComponent } from './componentes/libro/libro/libro.component';
import { AddlibroComponent } from './componentes/libro/addlibro/addlibro.component';
import { HeaderComponent } from './componentes/header/header.component';
import { EditlibroComponent } from './componentes/libro/editlibro/editlibro.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { InisesComponent } from './componentes/autentication/inises/inises.component';
import { RegistroComponent } from './componentes/autentication/registro/registro.component';
import { FooterComponent } from './componentes/footer/footer.component';

// Imports Firebase
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';

@NgModule({
  declarations: [
    AppComponent,
    LibroComponent,
    AddlibroComponent,
    HeaderComponent,
    EditlibroComponent,
    InicioComponent,
    InisesComponent,
    RegistroComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    NgxSpinnerModule
  ],
  providers: [
    AngularFireAuth,
    AuthGuardService,
    NotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
