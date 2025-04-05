import { Component, OnInit } from '@angular/core';
import { PocketixVPCommand, PocketixVPExpression } from '../../model/pocketix-vp-program.model';
import { PocketixVPStatementLanguage } from '../../model/pocketix-vp-language.model';
import { PocketixGVPAbstracStatement } from '../../abstract/pocketix-vp-abstract-statement';

@Component({
  selector: 'pocketix-vp-cmd-statement',
  templateUrl: './pocketix-vp-cmd-statement.component.html',
  styleUrls: ['./pocketix-vp-cmd-statement.component.css']
})
export class PocketixVpCmdStatementComponent extends PocketixGVPAbstracStatement<PocketixVPCommand> implements OnInit {

  public values: PocketixVPExpression[] = [];
  
  public typing: boolean = false;

  public updating: boolean = false;

  protected timer;

  public readonly defaultStmtLanguage: PocketixVPStatementLanguage = {
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

    if(!this.stmt.params) {
      this.stmt.params = [];
    }
    this.values = [...this.stmt.params];
  }

  protected getDefaultStatement(): PocketixVPCommand {
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
      this.stmt.params = [...this.values];
      this.timer = undefined;
      this.showUpdating();
      this.update();
    }, 1000);
  }

  public remove(i) {
    this.values.splice(i, 1);
    this.stmt.params = [...this.values];
    this.showUpdating();
    this.update();
  }

  public add() {
    this.values = [...this.values, ""];
    this.stmt.params = [...this.values];
    this.showUpdating();
    this.update();
  }

}
