import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';

import { PocketixVPBlock, PocketixVPProgram } from '../../model/pocketix-vp-program.model';
import { PocketixVPLanguage } from '../../model/pocketix-vp-language.model';
import { PocketixVPSettings } from '../../model/pocketix-vp-settings.model';
import { PocketixVpTextEditorComponent } from '../pocketix-vp-text-editor/pocketix-vp-text-editor.component';
import { defaultSettings } from '../../util/defaultSettings';
import { captureAnalyticsEvent, setAnalyticsConsent } from '../../util/analytics';
import { hasStoredConsent, storeConsent } from '../../util/analyticsConsent';

@Component({
  selector: 'pocketix-vp-program',
  templateUrl: './pocketix-vp-program.component.html',
  styleUrls: ['./pocketix-vp-program.component.css'],
})
export class PocketixVpProgramComponent implements OnInit, OnDestroy {

  @Input() program: PocketixVPProgram;

  @Input() language: PocketixVPLanguage;

  @Output() onProgramChange = new EventEmitter<PocketixVPProgram>();

  @Input() settings: PocketixVPSettings = defaultSettings;

  public undoList: string[] = [];

  public redoList: string[] = [];

  @ViewChild(PocketixVpTextEditorComponent) textEditor: PocketixVpTextEditorComponent;

  public trigger: number = 0;

  protected currentUndo: string;

  public displayLangDialog: boolean = false;

  public languageString: string;

  public mobileClosedVisualEditor: boolean = false;

  public mobileClosedTextEditor: boolean = !this.mobileClosedVisualEditor;

  public level = 0;

  protected timer;

  public actLanguageSyntaxError: boolean = false;

  public hasConsented: boolean = hasStoredConsent();

  constructor() { }

  get analyticsEnabled(): boolean {
    return this.settings.analytics?.enabled ?? false;
  }

  get isAgreeVisible(): boolean {
    return this.analyticsEnabled && !this.hasConsented;
  }

  ngOnInit(): void {
    this.currentUndo = JSON.stringify(this.program);
    setAnalyticsConsent(this.analyticsEnabled && this.hasConsented);
  }

  handleAgreeClose() {
    storeConsent();
    setAnalyticsConsent(true);
    captureAnalyticsEvent('data_analysis_agreed', {
      timestamp: new Date().toISOString(),
      vpl_version: 'vpl_ng'
    });
    this.hasConsented = true;
  }

  onToggleManualSync(checked: boolean) {
    captureAnalyticsEvent('toggled_manual_sync', {
      enabled: checked,
      timestamp: new Date().toISOString(),
      vpl_version: 'vpl_ng'
    });
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  onBlockChange(newBlock: PocketixVPBlock) {
    this.program.block = newBlock;
  }

  updateTextEditor() {
    this.textEditor.refresh();
    this.undoList.push(this.currentUndo);
    this.currentUndo = JSON.stringify(this.program);
    if(this.redoList.length > 0) {
      this.redoList = [];
    }

    this.onProgramChange.emit(this.program);
  }

  updateVisualEditor() {
    this.program = this.textEditor.getProgram();
    this.undoList.push(this.currentUndo);
    this.currentUndo = JSON.stringify(this.program);
    if(this.redoList.length > 0) {
      this.redoList = [];
    }

    this.onProgramChange.emit(this.program);
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
    if (this.undoList.length === 0) {
      return;
    }

    captureAnalyticsEvent('undo_action', {
      timestamp: new Date().toISOString(),
      vpl_version: 'vpl_ng'
    });

    this.redoList.push(JSON.stringify(this.program))
    this.program = JSON.parse(this.undoList.pop());
    this.currentUndo = JSON.stringify(this.program);
    this.onProgramChange.emit(this.program);
  }

  redo() {
    if (this.redoList.length === 0) {
      return;
    }

    captureAnalyticsEvent('redo_action', {
      timestamp: new Date().toISOString(),
      vpl_version: 'vpl_ng'
    });

    this.undoList.push(JSON.stringify(this.program))
    this.program = JSON.parse(this.redoList.pop());
    this.currentUndo = JSON.stringify(this.program);
    this.onProgramChange.emit(this.program);
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
