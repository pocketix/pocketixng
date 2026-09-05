import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IotixVpCmdStatementComponent } from './iotix-vp-cmd-statement.component';

describe('IoTiXVPCmdStatementComponent', () => {
  let component: IotixVpCmdStatementComponent;
  let fixture: ComponentFixture<IotixVpCmdStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IotixVpCmdStatementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IotixVpCmdStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
