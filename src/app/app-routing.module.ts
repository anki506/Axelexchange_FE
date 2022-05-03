import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';


const accountModule = () => import('./account/account.module').then(x => x.AccountModule);

const routes: Routes = [
  {path:':id',component:LoginComponent} ,
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
