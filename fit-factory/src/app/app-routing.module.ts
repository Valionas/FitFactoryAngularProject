import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth-components/login/login.component';
import { RegisterComponent } from './auth-components/register/register.component';
import { DietsComponent } from './diets/diets.component';
import { HomeComponent } from './home/home.component';
import { PersonalCalorieCalculatorComponent } from './personal-calorie-calculator/personal-calorie-calculator.component';
import { WorkoutsComponent } from './workouts/workouts.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'diets',
    component: DietsComponent
  },
  {
    path: 'workouts',
    component: WorkoutsComponent
  },
  {
    path: 'calculator',
    component: PersonalCalorieCalculatorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
