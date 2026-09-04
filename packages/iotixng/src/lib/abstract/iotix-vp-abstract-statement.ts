import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { IoTiXVPAbstractStatement } from "../model/iotix-vp-program.model";
import { IoTiXVPLanguage } from "../model/iotix-vp-language.model";
import { IotixVpTestposPipe } from "../pipes/iotix-vp-testpos.pipe";

@Component({ template: '' })
export abstract class IoTiXGVPAbstracStatement<T extends IoTiXVPAbstractStatement> implements OnInit, OnChanges {
  
  @Input() statements: T;

  @Input() language: IoTiXVPLanguage;

  @Input() blockLength: number;

  @Input() position: number = -1;

  @Input() parent: IoTiXVPAbstractStatement;

  @Input() level: number = 0;

  @Output() onUp: EventEmitter<void> = new EventEmitter<void>();

  @Output() onDown: EventEmitter<void> = new EventEmitter<void>();

  @Output() onDelete: EventEmitter<void> = new EventEmitter<void>();

  @Output() onUpdate: EventEmitter<void> = new EventEmitter<void>();

  public correctPos: boolean = true;

  public constructor() {
  }

  public ngOnInit(): void {
    if(!this.statements) {
      this.statements = this.getDefaultStatement();
    }
    
    this.checkPosition();
  }

  protected abstract getDefaultStatement(): T;

  public ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'blockLength':
          case 'position':
          case 'language':
          case 'parent':
          case 'statements': {
            this.checkPosition();
            break;
          }
        }
      }
    }
  }

  protected checkPosition() {
    const transformPipe = new IotixVpTestposPipe()
    this.correctPos =
      transformPipe.transform(this.position, this.blockLength,
        true, this.language.statements[this.statements.name]?.positions) &&
      transformPipe.transform(this.position, this.blockLength,
        false, this.language.statements[this.statements.name]?.avoidPositions) &&
      this.isInCorrectParent() && this.isInCorrectLevel()
  }

  protected isInCorrectParent() {
    const parents = this.language.statements[this.statements.name]?.parents;
    const avoidParents = this.language.statements[this.statements.name]?.avoidParents;
    const result = (!parents || parents.includes(this.parent.name)) &&
        (!avoidParents || !avoidParents.includes(this.parent.name))
    return result;
  }

  protected isInCorrectLevel() {
    const levels = this.language.statements[this.statements.name]?.levels;
    const avoidLevels = this.language.statements[this.statements.name]?.avoidLevels;
    const result = (!levels || levels.includes(this.level)) &&
        (!avoidLevels || !avoidLevels.includes(this.level))
    return result;
  }

  up() {
    this.onUp.emit();
  }

  down() {
    this.onDown.emit();
  }

  delete() {
    this.onDelete.emit();
  }

  update() {
    this.onUpdate.emit();
  }
}