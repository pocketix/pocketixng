import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IotixVpCompoundStatementComponent } from './iotix-vp-compound-statement.component';

describe('IoTiXVPCompoundStatementComponent', () => {
  let component: IotixVpCompoundStatementComponent;
  let fixture: ComponentFixture<IotixVpCompoundStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IotixVpCompoundStatementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IotixVpCompoundStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
