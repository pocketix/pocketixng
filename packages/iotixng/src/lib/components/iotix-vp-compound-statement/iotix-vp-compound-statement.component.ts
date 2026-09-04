import {Component, Input, OnInit} from '@angular/core';
import { IoTiXGVPAbstracStatement } from '../../abstract/iotix-vp-abstract-statement';
import { IoTiXVPBlock, IoTiXVPCompoundStatement, IoTiXVPExpression } from '../../model/iotix-vp-program.model';
import { IoTiXVPStatementLanguage } from '../../model/iotix-vp-language.model';

@Component({
    selector: 'iotix-vp-compound-statement',
    templateUrl: './iotix-vp-compound-statement.component.html',
    styleUrls: ['./iotix-vp-compound-statement.component.css'],
    standalone: false
})
export class IotixVpCompoundStatementComponent extends IoTiXGVPAbstracStatement<IoTiXVPCompoundStatement> implements OnInit {

  public condition: IoTiXVPExpression = "";
  
  public typing: boolean = false;
  
  public updating: boolean = false;

  protected timer;

  public readonly defaultstatementsLanguage: IoTiXVPStatementLanguage = {
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

    if(!this.statements.block) {
      this.statements.block = [];
    }
    if(!this.statements.condition) {
      this.statements.condition = "";
    }
  }

  protected getDefaultStatement(): IoTiXVPCompoundStatement {
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

  public onBlockChange(newBlock: IoTiXVPBlock) {
    this.statements.block = newBlock;
  }

  public onInputChange(value) {
    this.condition = value;
    this.typing = true;
    if(this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.statements.condition = this.condition;
      this.timer = undefined;
      this.showUpdating();
      this.update();
    }, 1000);
  }

}
