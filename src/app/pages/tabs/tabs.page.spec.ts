import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TabsPage } from './tabs.page';

describe('TabsPage', () => {
  let component: TabsPage;
  //let fixture: ComponentFixture<TabsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    // fixture = TestBed.createComponent(TabsPage);
    // component = fixture.componentInstance;
    //fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //pruebas unitarias
    //pruebas unitarias
    it('1. Levantar la página Tabs', ()=>{
      const fixture = TestBed.createComponent(TabsPage);
      const app = fixture.componentInstance;
      
      expect(app).toBeTruthy();
    });
});




