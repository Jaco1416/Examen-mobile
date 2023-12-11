import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RestablecerPage } from './restablecer.page';

describe('RecuperarPage', () => {
  let component: RestablecerPage;
  let fixture: ComponentFixture<RestablecerPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RestablecerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RestablecerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //pruebas unitarias
  it('1. Levantar la página restablecer', ()=>{
    const fixture = TestBed.createComponent(RestablecerPage);
    const app = fixture.componentInstance;
    
    expect(app).toBeTruthy();
  });
});
