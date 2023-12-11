import { IonicModule } from "@ionic/angular";
import { LoginPage } from "./login.page";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { environment } from "src/environments/environment";

describe('1. Página login', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [IonicModule.forRoot(),
        AngularFirestoreModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  //Pruebas unitarias
  it('1 Creación del componente login', () => {
    expect(component).toBeTruthy();
  });

  it('2 Levantar la página Login', () => {
    const fixture = TestBed.createComponent(LoginPage);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  it('3 Correo incorrecto', () => {
    const correo_usuario = component.usuario.controls['correo'];
    correo_usuario?.setValue('aaa@gmail.cl');
    expect(correo_usuario?.invalid).toBeTruthy();
  });

  it('4 Correo correcto', () => {
    const correo_usuario = component.usuario.controls['correo'];
    correo_usuario?.setValue('bal.roa@duoc.cl');
    expect(correo_usuario?.valid).toBeTruthy();
  });

  it('5 Formulario incorrecto', () => {
    const correo_usuario = component.usuario.controls['correo'];
    const clave = component.usuario.controls['clave'];
    correo_usuario?.setValue('aaa@gmail.cl');
    clave.setValue('Aa1');
    expect(component.usuario.invalid).toBeTruthy();
  });

  it('6 Formulario correcto', () => {
    const correo_usuario = component.usuario.controls['correo'];
    const clave = component.usuario.controls['clave'];
    correo_usuario?.setValue('Bal.roa@duoc.cl');
    clave.setValue('AAAaaa111');
    expect(component.usuario.valid).toBeTruthy();
  });

  it('7 Formulario incorrecto', () => {
    const correo_usuario = component.usuario.controls['correo'];//antes estaba como .get('correo')
    const clave = component.usuario.controls['clave'];
    correo_usuario?.setValue('aaa@gmail.cl');
    clave.setValue('AAAaaa111');
    expect(component.usuario.invalid).toBeTruthy();
  });

});
