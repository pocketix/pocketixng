import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocketixVpBlockComponent } from './pocketix-vp-block.component';

describe('PocketixGVPBlockComponent', () => {
  let component: PocketixVpBlockComponent;
  let fixture: ComponentFixture<PocketixVpBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PocketixVpBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PocketixVpBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
