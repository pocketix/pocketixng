import { Component, OnInit } from '@angular/core';
import { IoTiXVPCommand, IoTiXVPExpression } from '../../model/iotix-vp-program.model';
import { IoTiXVPStatementLanguage } from '../../model/iotix-vp-language.model';
import { IoTiXGVPAbstracStatement } from '../../abstract/iotix-vp-abstract-statement';

@Component({
  selector: 'iotix-vp-cmd-statement',
  templateUrl: './iotix-vp-cmd-statement.component.html',
  styleUrls: ['./iotix-vp-cmd-statement.component.css']
})
export class IotixVpCmdStatementComponent extends IoTiXGVPAbstracStatement<IoTiXVPCommand> implements OnInit {

  public values: IoTiXVPExpression[] = [];
  
  public typing: boolean = false;

  public updating: boolean = false;

  protected timer;

  public readonly defaultstatementsLanguage: IoTiXVPStatementLanguage = {
    component: "cmd",
    label: "unknown",
    icon: "pi-bolt",
    color: "white",
    backgroundColor: "#F08080",
    extensions: {
      params: {
        type: "array",
        defs: String
      }
    }
  }

  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();

    if(!this.statements.params) {
      this.statements.params = [];
    }
    this.values = [...this.statements.params];
  }

  protected getDefaultStatement(): IoTiXVPCommand {
    return {
      name: "unknown",
      params: []
    };
  }
  
  protected showUpdating() {
    this.updating = true;
      setTimeout(() => {
        this.updating = false;
        this.typing = false;
      }, 500);
  }

  public onInputChange(value, i) {
    this.values[i] = value;
    this.typing = true;
    if(this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.statements.params = [...this.values];
      this.timer = undefined;
      this.showUpdating();
      this.update();
    }, 1000);
  }

  public remove(i) {
    this.values.splice(i, 1);
    this.statements.params = [...this.values];
    this.showUpdating();
    this.update();
  }

  public add() {
    this.values = [...this.values, ""];
    this.statements.params = [...this.values];
    this.showUpdating();
    this.update();
  }

  // Without an explicit trackBy, *ngFor tracks primitive array items by
  // value equality - two identical (e.g. both freshly-added empty-string)
  // params would be indistinguishable to Angular's default diffing, the
  // same class of bug as keying by raw value in iotix-react.
  public trackByIndex(index: number): number {
    return index;
  }

}
