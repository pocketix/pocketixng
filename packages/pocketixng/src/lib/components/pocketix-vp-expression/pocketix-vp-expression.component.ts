import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { PocketixVPLanguage, PocketixVPVariable } from '../../model/pocketix-vp-language.model';
import { isValidExpressionSyntax } from '../../util/checkExpressionSyntax';

@Component({
  selector: 'pocketix-vp-expression',
  templateUrl: './pocketix-vp-expression.component.html',
  styleUrls: ['./pocketix-vp-expression.component.css']
})
export class PocketixVpExpressionComponent implements OnInit, OnDestroy {

  @ViewChild('expTextArea', { static: false }) textarea: ElementRef;

  @Input() language: PocketixVPLanguage;

  @Input() value;

  @Input() backgroundColor: string = "#f5f5f5";

  @Input() color: string = "#495057";
  
  @Output() onValueChanged: EventEmitter<string> = new EventEmitter<string>();

  protected timer;

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

  ngOnDestroy(): void {
    if (this.timer) {
      clearTimeout(this.timer);
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
    this.actExpSyntaxError = !isValidExpressionSyntax(this.dialogExpressionString);

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
