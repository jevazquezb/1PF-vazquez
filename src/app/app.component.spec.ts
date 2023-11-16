import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { AppModule } from './app.module';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AppModule
      ],
      declarations: [AppComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();    
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'PF-vazquez'`, () => {
    expect(component.title).toEqual('PF-vazquez');
  });

  it(`should have showSideNav and isLoggedIn to be false`, () => {
    expect(component.showSideNav).toEqual(false);
    expect(component.isLoggedIn).toEqual(false);
  });
});
