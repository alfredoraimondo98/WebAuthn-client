import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCheckCredentialsComponent } from './popup-check-credentials.component';

describe('PopupCheckCredentialsComponent', () => {
  let component: PopupCheckCredentialsComponent;
  let fixture: ComponentFixture<PopupCheckCredentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupCheckCredentialsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupCheckCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
