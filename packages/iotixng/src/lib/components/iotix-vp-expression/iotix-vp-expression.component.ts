import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { IoTiXVPLanguage, IoTiXVPVariable } from '../../model/iotix-vp-language.model';
import { isValidExpressionSyntax } from '../../util/checkExpressionSyntax';
import { captureAnalyticsEvent } from '../../util/analytics';

@Component({
    selector: 'iotix-vp-expression',
    templateUrl: './iotix-vp-expression.component.html',
    styleUrls: ['./iotix-vp-expression.component.css'],
    standalone: false
})
export class IotixVpExpressionComponent implements OnInit, OnDestroy {

  @ViewChild('expTextArea', { static: false }) textarea: ElementRef;

  @Input() language: IoTiXVPLanguage;

  @Input() value;

  @Input() backgroundColor: string = "#f5f5f5";

  @Input() color: string = "#495057";

  @Input() blockType?: string;

  @Output() onValueChanged: EventEmitter<string> = new EventEmitter<string>();

  protected timer;

  public displayExpDialog: boolean = false;

  public dialogExpressionString: string = "";

  public actExpSyntaxError: boolean = false;

  public variables: IoTiXVPVariable[] = [];

  public selectedVariable: IoTiXVPVariable;

  protected isChanged: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if(this.language.variables) {
      this.variables = this.language.variables;
    }
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  onInputChanged(e) {
    this.isChanged = true;
    this.onValueChanged.emit(e.target.value);
  }

  onInputBlur() {
    if (this.isChanged) {
      captureAnalyticsEvent('updated_expression_input_field', {
        expression: this.value,
        block_type: this.blockType,
        timestamp: new Date().toISOString(),
        vpl_version: 'vpl_ng'
      });

      this.isChanged = false;
    }
  }

  inputClicked(e) {
    e.stopPropagation();
    return false;
  }

  buttonClicked(e) {
    e.stopPropagation();
    this.openExpDialog();
    return false;
  }

  openExpDialog() {
    this.dialogExpressionString = this.value;
    this.actExpSyntaxError = false;
    this.displayExpDialog = true;

    captureAnalyticsEvent('opened_expression_editor', {
      timestamp: new Date().toISOString(),
      vpl_version: 'vpl_ng'
    });
  }

  addVariable() {
    const selectedVariable = this.selectedVariable?.label ?? "";

    const startPos = this.textarea.nativeElement.selectionStart;
    const endPos = this.textarea.nativeElement.selectionEnd;

    this.dialogExpressionString = this.dialogExpressionString.substring(0, startPos) + selectedVariable + this.dialogExpressionString.substring(endPos, this.dialogExpressionString.length);

    this.textarea.nativeElement.focus();
    this.textarea.nativeElement.setSelectionRange(startPos + selectedVariable.length, startPos + selectedVariable.length);

    captureAnalyticsEvent('added_variable_to_expression', {
      variable: selectedVariable,
      timestamp: new Date().toISOString(),
      vpl_version: 'vpl_ng'
    });
  }

  checkExpression(): boolean {
    this.actExpSyntaxError = !isValidExpressionSyntax(this.dialogExpressionString);

    return !this.actExpSyntaxError;
  }

  updateExpression() {
    if(this.checkExpression()) {
      this.value = this.dialogExpressionString;
      this.onValueChanged.emit(this.value);

      captureAnalyticsEvent('updated_expression_dialog', {
        expression: this.value,
        block_type: this.blockType,
        timestamp: new Date().toISOString(),
        vpl_version: 'vpl_ng'
      });
    }
  }

  public onExpressionInputChange() {
    if(this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.checkExpression();

      this.timer = undefined;
    }, 100);
  }

  confirmExpressionDialog() {
    this.displayExpDialog = false;
    clearTimeout(this.timer);
    this.timer = undefined;

    this.updateExpression();
  }

  cancelExpressionDialog() {
    this.displayExpDialog = false;
    clearTimeout(this.timer);
    this.timer = undefined;
  }

}
