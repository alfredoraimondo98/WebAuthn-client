import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupUploadDataComponent } from './popup-upload-data.component';

describe('PopupUploadDataComponent', () => {
  let component: PopupUploadDataComponent;
  let fixture: ComponentFixture<PopupUploadDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupUploadDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupUploadDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
