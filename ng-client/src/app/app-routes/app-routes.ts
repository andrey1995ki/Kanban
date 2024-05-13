import {Routes} from "@angular/router";
import {AppRoutesEnum} from "./app-routes.enum";
import {MainComponent} from "../main/main.component";
import {BoardComponent} from "../main/board/board.component";
import {AuthComponent} from "../main/auth/auth.component";
import {AppRoutesGuard, BoardGuard, LoginGuard} from "./app-routes.guard";
import {ChartComponent} from "../main/chart/chart.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: AppRoutesEnum.Main,
    pathMatch: 'full'
  },
  {
    path: `${AppRoutesEnum.Main}/login`,
    component: AuthComponent,
    canActivate: [LoginGuard]
  },
  {
    path: AppRoutesEnum.Main,
    component: MainComponent,
    canActivate: [AppRoutesGuard],
    children: [
      {
        path:'',
        component: ChartComponent
      },
      {
        path: AppRoutesEnum.Board,
        component: BoardComponent,
        canActivate: [BoardGuard]
      }
    ]
  }
]
