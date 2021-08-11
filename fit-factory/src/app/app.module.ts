import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
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
import {MatMenuModule} from '@angular/material/menu';
import {MatRadioModule} from '@angular/material/radio';
//App Components
import { LoginComponent } from './auth-components/login/login.component';
import { RegisterComponent } from './auth-components/register/register.component';
import { PersonalCalorieCalculatorComponent } from './personal-calorie-calculator/personal-calorie-calculator.component';
import { AddWorkoutDialog, WorkoutsComponent } from './workouts/workouts.component';
import { AddDietDialog, DietsComponent } from './diets/diets.component';
import { environment } from 'src/environments/environment';
import { FirebaseAuthService } from './services/firebase-auth.service';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './home/navigation/navbar/navbar.component';
import { AuthenticateGuard } from './guards/auth.activate';
import { CRUDService } from './services/crud-service';
import { FormsModule } from '@angular/forms';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { WorkoutTypesComponent } from './workout-types/workout-types.component';
import { MacronutrientsComponent } from './macronutrients/macronutrients.component';
import { ResetPasswordComponent } from './auth-components/reset-password/reset-password.component';
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
    AddWorkoutDialog,
    ContactUsComponent,
    NotFoundPageComponent,
    WorkoutTypesComponent,
    MacronutrientsComponent,
    ResetPasswordComponent
  ],
  imports: [
    //Angular modules
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
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
    MatMenuModule,
    MatRadioModule
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
