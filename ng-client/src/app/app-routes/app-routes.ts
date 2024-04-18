import {Router, Routes} from "@angular/router";
import {AppRoutesEnum} from "./app-routes.enum";
import {MainComponent} from "../main/main.component";

export const routes: Routes = [
  {
    path:'',
    redirectTo:AppRoutesEnum.Main,
    pathMatch:'full'
  },
  {
    path: AppRoutesEnum.Main,
    component: MainComponent,
    children:[
    ]
  }
]
