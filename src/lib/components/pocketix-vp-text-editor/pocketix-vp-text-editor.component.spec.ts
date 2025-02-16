import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocketixVpTextEditorComponent } from './pocketix-vp-text-editor.component';

describe('PocketixVpTextEditorComponent', () => {
  let component: PocketixVpTextEditorComponent;
  let fixture: ComponentFixture<PocketixVpTextEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PocketixVpTextEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PocketixVpTextEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
