import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { PocketixVPProgram } from '../../model/pocketix-vp-program.model';
import { PocketixVPLanguage } from '../../model/pocketix-vp-language.model';
import { PocketixVPSettings } from '../../model/pocketix-vp-settings.model';
import { PocketixVpTextEditorComponent } from '../pocketix-vp-text-editor/pocketix-vp-text-editor.component';

@Component({
  selector: 'pocketix-vp-program',
  templateUrl: './pocketix-vp-program.component.html',
  styleUrls: ['./pocketix-vp-program.component.css'],
})
export class PocketixVpProgramComponent implements OnInit {

  @Input() program: PocketixVPProgram;
  
  @Input() language: PocketixVPLanguage;

  @Input() settings: PocketixVPSettings = {
    menu: {
      enabled: true,
      enableToggleVisual: true,
      enableSaveVisual: true,
      enableUndo: true,
      enableRedo: true,
      enableSync: true,
      enableSaveText: true,
      enableToggleText: true,
      enableLang: true
    },
    visualEditor: {
      enabled: true
    },
    textEditor: {
      enabled: true,
      style: {}
    },
    common: {
      manualSync: false
    }
  };

  public undoList: string[] = [];

  public redoList: string[] = [];

  @ViewChild(PocketixVpTextEditorComponent) textEditor: PocketixVpTextEditorComponent;

  public trigger: number = 0;

  protected currentUndo: string;

  public displayLangDialog: boolean = false;

  public languageString: string;

  public mobileClosedVisualEditor: boolean = true;

  public mobileClosedTextEditor: boolean = !this.mobileClosedVisualEditor;

  public level = 0;

  protected timer;

  public actLanguageSyntaxError: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.currentUndo = JSON.stringify(this.program);
  }

  updateTextEditor() {
    this.textEditor.refresh();
    this.undoList.push(this.currentUndo);
    this.currentUndo = JSON.stringify(this.program);
    if(this.redoList.length > 0) {
      this.redoList = [];
    }

  }

  updateVisualEditor() {
    this.program = this.textEditor.getProgram();
    this.undoList.push(this.currentUndo);
    this.currentUndo = JSON.stringify(this.program);
    if(this.redoList.length > 0) {
      this.redoList = [];
    }
  }

  visualEditorUpdated() {
    if(!this.settings.common.manualSync) {
      this.updateTextEditor();
    }
  }

  textEditorUpdated() {
    if(!this.settings.common.manualSync) {
      this.updateVisualEditor();
    }
  }

  undo() {
    this.redoList.push(JSON.stringify(this.program))
    this.program = JSON.parse(this.undoList.pop());
    this.currentUndo = JSON.stringify(this.program);
  }

  redo() {
    this.undoList.push(JSON.stringify(this.program))
    this.program = JSON.parse(this.redoList.pop());
    this.currentUndo = JSON.stringify(this.program);
  }

  openLangDialog() {
    this.languageString = JSON.stringify(this.language, null, 2);
    this.actLanguageSyntaxError = false;
    this.displayLangDialog = true;
  }

  checkLanguage(): PocketixVPLanguage | undefined {
    try {
      const lang = JSON.parse(this.languageString);
      this.actLanguageSyntaxError = false;
      return lang;
    } catch(e) {
      this.actLanguageSyntaxError = true;
    }
  }

  updateLanguage() {
    const language = this.checkLanguage();
    if(language) {
      this.language = language;
    }
  }

  public onLanguageInputChange() {
    if(this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.checkLanguage();

      this.timer = undefined;
    }, 1000);
  }

  confirmLanguageDialog() {
    this.displayLangDialog = false;
    clearTimeout(this.timer);
    this.timer = undefined;

    this.updateLanguage();
  }

  cancelLanguageDialog() {
    this.displayLangDialog = false;
    clearTimeout(this.timer);
    this.timer = undefined;
  }
}
