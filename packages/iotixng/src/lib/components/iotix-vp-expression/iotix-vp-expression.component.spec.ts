import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IotixVpExpressionComponent } from './iotix-vp-expression.component';

describe('IoTiXVPExpressionComponent', () => {
  let component: IotixVpExpressionComponent;
  let fixture: ComponentFixture<IotixVpExpressionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IotixVpExpressionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IotixVpExpressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
