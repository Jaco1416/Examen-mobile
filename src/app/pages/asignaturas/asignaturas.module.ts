import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsignaturasPageRoutingModule } from './asignaturas-routing.module';

import { AsignaturasPage } from './asignaturas.page';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsignaturasPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AsignaturasPage]
})
export class AsignaturasPageModule {}
