import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth-components/login/login.component';
import { RegisterComponent } from './auth-components/register/register.component';
import { ResetPasswordComponent } from './auth-components/reset-password/reset-password.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DietsComponent } from './diets/diets.component';
import { AuthenticateGuard } from './guards/auth.activate';
import { HomeComponent } from './home/home.component';
import { MacronutrientsComponent } from './macronutrients/macronutrients.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { PersonalCalorieCalculatorComponent } from './personal-calorie-calculator/personal-calorie-calculator.component';
import { WorkoutTypesComponent } from './workout-types/workout-types.component';
import { WorkoutsComponent } from './workouts/workouts.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate:[AuthenticateGuard],
    data:{
      authenticated: true,
      onFailRedirect: '/login',
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate:[AuthenticateGuard],
    data:{
      authenticated: false,
      onFailRedirect: '/home',

    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate:[AuthenticateGuard],
    data:{
      authenticated: false,
      onFailRedirect: '/home',

    }
  },
  {
    path: 'diets',
    component: DietsComponent,
    canActivate:[AuthenticateGuard],
    data:{
      authenticated: true,
      onFailRedirect: '/login',

    }
  },
  {
    path: 'workouts',
    component: WorkoutsComponent,
    canActivate:[AuthenticateGuard],
    data:{
      authenticated: true,
      onFailRedirect: '/login',
    }
  },
  {
    path: 'calculator',
    component: PersonalCalorieCalculatorComponent,
    canActivate:[AuthenticateGuard],
    data:{
      authenticated: true,
      onFailRedirect: '/login',
    }
  },
  {
    path: 'contactus',
    component: ContactUsComponent,
    canActivate:[AuthenticateGuard],
    data:{
      authenticated: true,
      onFailRedirect: '/login',
    }
  },
  {
    path:'workouts-types',
    component: WorkoutTypesComponent,
    canActivate:[AuthenticateGuard],
    data:{
      authenticated: true,
      onFailRedirect: '/login'
    }
  },
  {
    path: "macronutrients",
    component: MacronutrientsComponent,
    canActivate: [AuthenticateGuard],
    data:{
      authenticated: true,
      onFailRedirect: '/login'
    }
  },
  {
    path:"reset-password",
    component: ResetPasswordComponent,
    canActivate: [AuthenticateGuard],
    data:{
      authenticated: false,
      onFailRedirect:'/home'
    }
  },
  {
    path: "**",
    component: NotFoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
