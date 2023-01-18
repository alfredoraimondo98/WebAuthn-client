import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupUploadImagesComponent } from './popup-upload-images.component';

describe('PopupUploadImagesComponent', () => {
  let component: PopupUploadImagesComponent;
  let fixture: ComponentFixture<PopupUploadImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupUploadImagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupUploadImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
