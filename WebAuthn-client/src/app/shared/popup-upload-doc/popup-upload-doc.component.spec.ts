import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupUploadDocComponent } from './popup-upload-doc.component';

describe('PopupUploadDocComponent', () => {
  let component: PopupUploadDocComponent;
  let fixture: ComponentFixture<PopupUploadDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupUploadDocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupUploadDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
