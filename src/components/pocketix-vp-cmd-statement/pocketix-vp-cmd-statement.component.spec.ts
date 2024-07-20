import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocketixVpCmdStatementComponent } from './pocketix-vp-cmd-statement.component';

describe('PocketixVPCmdStatementComponent', () => {
  let component: PocketixVpCmdStatementComponent;
  let fixture: ComponentFixture<PocketixVpCmdStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PocketixVpCmdStatementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PocketixVpCmdStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
