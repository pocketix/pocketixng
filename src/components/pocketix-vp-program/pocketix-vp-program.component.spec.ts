import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocketixVpProgramComponent } from './pocketix-vp-program.component';

describe('PocketixVpProgramComponent', () => {
  let component: PocketixVpProgramComponent;
  let fixture: ComponentFixture<PocketixVpProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PocketixVpProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PocketixVpProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
