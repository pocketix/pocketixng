import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { PocketixVPBlock, PocketixVPProgram } from '../../model/pocketix-vp-program.model';
import { PocketixVPSettings } from '../../model/pocketix-vp-settings.model';

@Component({
  selector: 'pocketix-vp-text-editor',
  templateUrl: './pocketix-vp-text-editor.component.html',
  styleUrls: ['./pocketix-vp-text-editor.component.css']
})
export class PocketixVpTextEditorComponent implements OnInit, OnChanges {

  @Input() program: PocketixVPProgram;

  @Input() settings: PocketixVPSettings;

  @Output() onUpdate: EventEmitter<void> = new EventEmitter<void>();

  protected timer: NodeJS.Timeout;

  public editorContent: string;

  public actBlock: PocketixVPBlock;

  public syntaxError: boolean = false;

  constructor(private cdr: ChangeDetectorRef) { }

  public ngOnInit(): void {
    this.generate();
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

  update() {
    this.onUpdate.emit();
  }

}
