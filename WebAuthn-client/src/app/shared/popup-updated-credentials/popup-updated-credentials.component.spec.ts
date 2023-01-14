import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupUpdatedCredentialsComponent } from './popup-updated-credentials.component';

describe('PopupUpdatedCredentialsComponent', () => {
  let component: PopupUpdatedCredentialsComponent;
  let fixture: ComponentFixture<PopupUpdatedCredentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupUpdatedCredentialsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupUpdatedCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
