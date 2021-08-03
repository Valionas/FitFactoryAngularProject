import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
//Material UI
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
//App Components
import { LoginComponent } from './auth-components/login/login.component';
import { RegisterComponent } from './auth-components/register/register.component';
import { PersonalCalorieCalculatorComponent } from './personal-calorie-calculator/personal-calorie-calculator.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { DietsComponent } from './diets/diets.component';
import { environment } from 'src/environments/environment';
import { FirebaseAuthService } from './services/firebase-auth.service';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './home/navigation/navbar/navbar.component';
import { AuthenticateGuard } from './guards/auth.activate';
import { CRUDService } from './services/crud-service';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
  ],
  providers: [FirebaseAuthService, AuthenticateGuard, CRUDService],
  bootstrap: [AppComponent]
})
export class AppModule { }
