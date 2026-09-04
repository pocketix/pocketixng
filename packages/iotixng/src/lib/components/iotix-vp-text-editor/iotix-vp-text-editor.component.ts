import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { IoTiXVPBlock, IoTiXVPProgram } from '../../model/iotix-vp-program.model';
import { IoTiXVPSettings } from '../../model/iotix-vp-settings.model';
import { captureAnalyticsEvent } from '../../util/analytics';

@Component({
  selector: 'iotix-vp-text-editor',
  templateUrl: './iotix-vp-text-editor.component.html',
  styleUrls: ['./iotix-vp-text-editor.component.css']
})
export class IotixVpTextEditorComponent implements OnInit, OnChanges, OnDestroy {

  @Input() program: IoTiXVPProgram;

  @Input() settings: IoTiXVPSettings;

  @Output() onUpdate: EventEmitter<void> = new EventEmitter<void>();

  protected timer;

  public editorContent: string;

  public actBlock: IoTiXVPBlock;

  public syntaxError: boolean = false;

  protected changed: boolean = false;

  constructor(private cdr: ChangeDetectorRef) { }

  public ngOnInit(): void {
    this.generate();
  }

  public ngOnDestroy(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'program': {
            this.generate()
          }
        }
      }
    }
  }

  protected generate() {
    this.editorContent = JSON.stringify(this.program.block, null, 2);
    this.actBlock = this.program.block;
    this.syntaxError = false;
  }

  public refresh() {
    this.generate();
  }

  public getProgram() {
    return {
      ...this.program,
      block: this.actBlock
    }
  }

  public onInputChange() {
    this.changed = true;

    if(this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      try {
        this.actBlock = JSON.parse(this.editorContent);
        this.syntaxError = false;
        if(!this.settings.common.manualSync) {
          this.update();
        }
      } catch(e) {
        this.syntaxError = true;
      }
      this.timer = undefined;
    }, 1000);
  }

  public onBlur() {
    if (this.changed) {
      captureAnalyticsEvent('edited_program_in_text_editor', {
        timestamp: new Date().toISOString(),
        vpl_version: 'vpl_ng'
      });

      this.changed = false;
    }
  }

  update() {
    this.onUpdate.emit();
  }

}
