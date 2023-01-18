import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAssetCreatedComponent } from './popup-asset-created.component';

describe('PopupAssetCreatedComponent', () => {
  let component: PopupAssetCreatedComponent;
  let fixture: ComponentFixture<PopupAssetCreatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupAssetCreatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupAssetCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
