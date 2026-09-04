import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IotixVpStatementComponent } from './iotix-vp-statement.component';

describe('IoTiXPVStatementComponent', () => {
  let component: IotixVpStatementComponent;
  let fixture: ComponentFixture<IotixVpStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IotixVpStatementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IotixVpStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
