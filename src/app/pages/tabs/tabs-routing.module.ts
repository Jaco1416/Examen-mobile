import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {path: '',
      pathMatch: 'full',
      redirectTo: 'home'},
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'admin',
        loadChildren: () => import('../admin/admin.module').then(m => m.AdminPageModule)
      },
      {
        path: 'profesores',
        loadChildren: () => import('../profesores/profesores.module').then(m => m.ProfesoresPageModule)
      },
      {
        path: 'alumno',
        loadChildren: () => import('../alumno/alumno.module').then(m => m.AlumnoPageModule)
      },
      {
        path: 'asignaturas',
        loadChildren: () => import('../asignaturas/asignaturas.module').then(m => m.AsignaturasPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
