import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import Swal from 'sweetalert2';
//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
//Material UI
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
//App Components
import { LoginComponent } from './auth-components/login/login.component';
import { RegisterComponent } from './auth-components/register/register.component';
import { PersonalCalorieCalculatorComponent } from './personal-calorie-calculator/personal-calorie-calculator.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { AddDietDialog, DietsComponent } from './diets/diets.component';
import { environment } from 'src/environments/environment';
import { FirebaseAuthService } from './services/firebase-auth.service';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './home/navigation/navbar/navbar.component';
import { AuthenticateGuard } from './guards/auth.activate';
import { CRUDService } from './services/crud-service';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PersonalCalorieCalculatorComponent,
    WorkoutsComponent,
    DietsComponent,
    HomeComponent,
    NavbarComponent,
    AddDietDialog,
    
  ],
  imports: [
    //Angular modules
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    //Firebase modules
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    //Mat Modules
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  providers: [FirebaseAuthService, AuthenticateGuard, CRUDService],
  bootstrap: [AppComponent]
})
export class AppModule { }
