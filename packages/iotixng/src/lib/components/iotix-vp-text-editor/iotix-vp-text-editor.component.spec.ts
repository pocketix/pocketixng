import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IotixVpTextEditorComponent } from './iotix-vp-text-editor.component';

describe('IotixVpTextEditorComponent', () => {
  let component: IotixVpTextEditorComponent;
  let fixture: ComponentFixture<IotixVpTextEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IotixVpTextEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IotixVpTextEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
