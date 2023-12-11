import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicStorageModule } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';

import { ProfesoresPage } from './profesores.page';

describe('PRUEBA UNITARIAS: DocentePage', ()=>{
  
  beforeEach( async ()=>{
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        RouterTestingModule,
        IonicStorageModule.forRoot()
        
      ],
      declarations: [
        ProfesoresPage
      ]
    }).compileComponents();
  });

  //pruebas unitarias
  it('1. Levantar la página Docente', ()=>{
    const fixture = TestBed.createComponent(ProfesoresPage);
    const app = fixture.componentInstance;
    
    expect(app).toBeTruthy();
  });
});
