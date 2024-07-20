import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PocketixVPLanguage, PocketixVPVariable } from '../../model/pocketix-vp-language.model';

@Component({
  selector: 'pocketix-vp-expression',
  templateUrl: './pocketix-vp-expression.component.html',
  styleUrls: ['./pocketix-vp-expression.component.css']
})
export class PocketixVpExpressionComponent implements OnInit {

  @ViewChild('expTextArea', { static: false }) textarea: ElementRef;

  @Input() language: PocketixVPLanguage;

  @Input() value;

  @Input() backgroundColor: string = "#f5f5f5";

  @Input() color: string = "#495057";
  
  @Output() onValueChanged: EventEmitter<string> = new EventEmitter<string>();

  protected timer: NodeJS.Timeout;

  public displayExpDialog: boolean = false;

  public dialogExpressionString: string = "";

  public actExpSyntaxError: boolean = false;

  public variables: PocketixVPVariable[] = [];

  public selectedVariable: PocketixVPVariable;

  constructor() { }

  ngOnInit(): void {
    if(this.language.variables) {
      this.variables = this.language.variables;
    }
  }

  onInputChanged(e) {
    this.onValueChanged.emit(e.target.value);
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
  }

  addVariable() {
    const selectedVariable = this.selectedVariable?.label ?? "";

    const startPos = this.textarea.nativeElement.selectionStart;
    const endPos = this.textarea.nativeElement.selectionEnd;

    this.dialogExpressionString = this.dialogExpressionString.substring(0, startPos) + selectedVariable + this.dialogExpressionString.substring(endPos, this.dialogExpressionString.length);

    this.textarea.nativeElement.focus();
    this.textarea.nativeElement.setSelectionRange(startPos + selectedVariable.length, startPos + selectedVariable.length);
  }

  checkExpression(): boolean {
    try {
      // TODO evaluate syntax of expression
      this.actExpSyntaxError = false;
    } catch(e) {
      this.actExpSyntaxError = true;
    }

    return !this.actExpSyntaxError;
  }

  updateExpression() {
    if(this.checkExpression()) {
      this.value = this.dialogExpressionString;
      this.onValueChanged.emit(this.value);
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
