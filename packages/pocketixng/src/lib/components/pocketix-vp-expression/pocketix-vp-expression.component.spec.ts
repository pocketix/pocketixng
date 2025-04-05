import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocketixVpExpressionComponent } from './pocketix-vp-expression.component';

describe('PocketixVPExpressionComponent', () => {
  let component: PocketixVpExpressionComponent;
  let fixture: ComponentFixture<PocketixVpExpressionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PocketixVpExpressionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PocketixVpExpressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
