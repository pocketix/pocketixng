import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IotixVpBlockComponent } from './iotix-vp-block.component';

describe('IoTiXGVPBlockComponent', () => {
  let component: IotixVpBlockComponent;
  let fixture: ComponentFixture<IotixVpBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IotixVpBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IotixVpBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
