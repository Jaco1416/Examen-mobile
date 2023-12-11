import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicStorageModule } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import { RegistroPage } from './registro.page';

describe('PRUEBA UNITARIAS: RegistroPage', ()=>{
  
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
        RegistroPage
      ]
    }).compileComponents();
  });

  //pruebas unitarias
  it('1. Levantar la página Registrar', ()=>{
    const fixture = TestBed.createComponent(RegistroPage);
    const app = fixture.componentInstance;
    
    expect(app).toBeTruthy();
  });

  it('2. Formulario válido', ()=> {
    const fixture = TestBed.createComponent(RegistroPage);
    const app = fixture.componentInstance;
    
    let rut = app.usuario.controls['rut'];
    let p_nombre = app.usuario.controls['p_nombre'];
    let s_nombre = app.usuario.controls['s_nombre'];
    let ap_paterno = app.usuario.controls['ap_paterno'];
    let ap_materno = app.usuario.controls['ap_materno'];
    let perfil = app.usuario.controls['perfil'];
    let email = app.usuario.controls['email'];
    let fecha_nac = app.usuario.controls['fecha_nac']
    let pass_1 = app.usuario.controls['pass_1'];
    let pass_2 = app.usuario.controls['pass_2']
    
    rut.setValue('20707458-6');
    p_nombre.setValue('juan');
    s_nombre.setValue('ozuna');
    ap_paterno.setValue('soto');
    ap_materno.setValue('roa');
    perfil.setValue('alumno');
    email.setValue('juan@duoc.cl')
    fecha_nac.setValue('1996-12-12')
    pass_1.setValue('AAAaaa111')
    pass_2.setValue('AAAaaa111')

    //app.registrar();
    
    
    expect(app.usuario.valid).toBeFalse();
  });
  

  it('3. Formulario invalido', ()=>{
    const fixture = TestBed.createComponent(RegistroPage);
    const app = fixture.componentInstance;
    
    let rut = app.usuario.controls['rut'];
    let p_nombre = app.usuario.controls['p_nombre'];
    let s_nombre = app.usuario.controls['s_nombre'];
    let ap_paterno = app.usuario.controls['ap_paterno'];
    let ap_materno = app.usuario.controls['ap_materno'];
    let perfil = app.usuario.controls['perfil'];
    let email = app.usuario.controls['email'];
    let fecha_nac = app.usuario.controls['fecha_nac']
    let pass_1 = app.usuario.controls['pass_1'];
    let pass_2 = app.usuario.controls['pass_2']
    
    rut.setValue('20208051-9');
    p_nombre.setValue('juan');
    s_nombre.setValue('ozuna');
    ap_paterno.setValue('');
    ap_materno.setValue('roa');
    perfil.setValue('alumno');
    email.setValue('juan@duoc.cl')
    fecha_nac.setValue('2010-12-12')
    pass_1.setValue('AAAaaa111')
    pass_2.setValue('AAAaaa111')
    
    //app.registrar();

    expect(app.v_agregar).toBeFalse();
  });
});
