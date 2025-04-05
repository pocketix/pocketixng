import { Component, OnInit } from '@angular/core';
import { PocketixGVPAbstracStatement } from '../../abstract/pocketix-vp-abstract-statement';
import { PocketixVPCompoundStatement, PocketixVPExpression } from '../../model/pocketix-vp-program.model';
import { PocketixVPStatementLanguage } from '../../model/pocketix-vp-language.model';

@Component({
  selector: 'pocketix-vp-compound-statement',
  templateUrl: './pocketix-vp-compound-statement.component.html',
  styleUrls: ['./pocketix-vp-compound-statement.component.css']
})
export class PocketixVpCompoundStatementComponent extends PocketixGVPAbstracStatement<PocketixVPCompoundStatement> implements OnInit {

  public condition: PocketixVPExpression = "";
  
  public typing: boolean = false;
  
  public updating: boolean = false;

  protected timer;

  public readonly defaultStmtLanguage: PocketixVPStatementLanguage = {
    component: "compound",
    label: "if",
    icon: "pi-question-circle",
    color: "white",
    backgroundColor: "#F08080",
    extensions: {
      enableCondition: true
    }
  }

  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();

    if(!this.stmt.block) {
      this.stmt.block = [];
    }
    if(!this.stmt.condition) {
      this.stmt.condition = "";
    }
  }

  protected getDefaultStatement(): PocketixVPCompoundStatement {
    return {
      name: "if",
      condition: "",
      block: []
    };
  }
  
  protected showUpdating() {
    this.updating = true;
      setTimeout(() => {
        this.updating = false
        this.typing = false;
      }, 500);
  }

  public onInputChange(value) {
    this.condition = value;
    this.typing = true;
    if(this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.stmt.condition = this.condition;
      this.timer = undefined;
      this.showUpdating();
      this.update();
    }, 1000);
  }

}
