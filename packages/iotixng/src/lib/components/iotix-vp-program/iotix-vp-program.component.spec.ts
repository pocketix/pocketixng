import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IotixVpProgramComponent } from './iotix-vp-program.component';

describe('IotixVpProgramComponent', () => {
  let component: IotixVpProgramComponent;
  let fixture: ComponentFixture<IotixVpProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IotixVpProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IotixVpProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
