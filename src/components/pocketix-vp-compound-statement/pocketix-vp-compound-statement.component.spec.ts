import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocketixVpCompoundStatementComponent } from './pocketix-vp-compound-statement.component';

describe('PocketixVPCompoundStatementComponent', () => {
  let component: PocketixVpCompoundStatementComponent;
  let fixture: ComponentFixture<PocketixVpCompoundStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PocketixVpCompoundStatementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PocketixVpCompoundStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
