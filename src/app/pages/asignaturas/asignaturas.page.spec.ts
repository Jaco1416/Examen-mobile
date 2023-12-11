import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsignaturasPage } from './asignaturas.page';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicStorageModule } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';

describe('pruebas unitarias: Asignaturas', ()=>{
  
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
        AsignaturasPage
      ]
    }).compileComponents();
  });

 
  //Pruebas unitarias
  it('1. Levantar la página Asignatura', ()=>{
    const fixture = TestBed.createComponent(AsignaturasPage);
    const app = fixture.componentInstance;
    
    expect(app).toBeTruthy();
  });
  it('2. Formulario inválido', ()=> {
    const fixture = TestBed.createComponent(AsignaturasPage);
    const app = fixture.componentInstance;

    let codigo = app.asignatura.controls['codigo'];
    let nombre = app.asignatura.controls['nombre'];
    let profesor = app.asignatura.controls['profesor'];

    codigo.setValue('');
    nombre.setValue('Matematicas');
    profesor.setValue('jose');

    expect(app.asignatura.valid).toBeFalse();
  });

  it('3. Formulario válido', ()=> {
    const fixture = TestBed.createComponent(AsignaturasPage);
    const app = fixture.componentInstance;
    
    let codigo = app.asignatura.controls['codigo'];
    let nombre = app.asignatura.controls['nombre'];
    let profesor = app.asignatura.controls['profesor'];

    codigo.setValue('22');
    nombre.setValue('Lenguaje');
    profesor.setValue('Jose');

    //app.registrar();

    expect(app.asignatura.valid).toBeTrue();
  });
  

  it('4. Ejecutar el boton agregar', ()=>{
    const fixture = TestBed.createComponent(AsignaturasPage);
    const app = fixture.componentInstance;
    
    let codigo = app.asignatura.controls['codigo'];
    let nombre = app.asignatura.controls['nombre'];
    let profesor = app.asignatura.controls['profesor'];

    codigo.setValue('22');
    nombre.setValue('Biologia');
    profesor.setValue('Agustin');
  
    //app.registrar();

    expect(app.v_agregar).toBeFalse();
  });
});
