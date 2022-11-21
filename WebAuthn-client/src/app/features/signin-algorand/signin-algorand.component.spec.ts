import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninAlgorandComponent } from './signin-algorand.component';

describe('SigninAlgorandComponent', () => {
  let component: SigninAlgorandComponent;
  let fixture: ComponentFixture<SigninAlgorandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SigninAlgorandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SigninAlgorandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
