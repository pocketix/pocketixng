import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocketixVpStatementComponent } from './pocketix-vp-statement.component';

describe('PocketixPVStatementComponent', () => {
  let component: PocketixVpStatementComponent;
  let fixture: ComponentFixture<PocketixVpStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PocketixVpStatementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PocketixVpStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
