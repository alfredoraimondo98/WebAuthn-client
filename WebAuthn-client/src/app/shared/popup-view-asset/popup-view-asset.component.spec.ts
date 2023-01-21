import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupViewAssetComponent } from './popup-view-asset.component';

describe('PopupViewAssetComponent', () => {
  let component: PopupViewAssetComponent;
  let fixture: ComponentFixture<PopupViewAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupViewAssetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupViewAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
