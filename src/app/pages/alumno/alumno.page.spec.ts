import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicStorageModule } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import { AlumnoPage } from './alumno.page';

describe('PRUEBA UNITARIAS: AlumnoPage', ()=>{
  
  //configurar nuestro ambiente de pruebas:
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
        AlumnoPage
      ]
    }).compileComponents();
  });

  //pruebas unitarias
  it('1. Levantar la página Alumno', ()=>{
    const fixture = TestBed.createComponent(AlumnoPage);
    const app = fixture.componentInstance;
    
    expect(app).toBeTruthy();
  });
});
