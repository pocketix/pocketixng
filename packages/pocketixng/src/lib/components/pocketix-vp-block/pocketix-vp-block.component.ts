import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PocketixVPBlock, PocketixVPStatement, } from '../../model/pocketix-vp-program.model';
import { PocketixVPLanguage, PocketixVPStatementLanguage } from '../../model/pocketix-vp-language.model';

@Component({
  selector: 'pocketix-vp-block',
  templateUrl: './pocketix-vp-block.component.html',
  styleUrls: ['./pocketix-vp-block.component.css']
})
export class PocketixVpBlockComponent implements OnInit {

  @Input() block: PocketixVPBlock;
  
  @Input() language: PocketixVPLanguage;

  @Input() parent: PocketixVPStatement = {
    name: "_"
  };

  @Output() onUpdate: EventEmitter<void> = new EventEmitter<void>();

  @Output() blockChange: EventEmitter<PocketixVPBlock> = new EventEmitter<PocketixVPBlock>();

  @Input() level: number = 0;

  public displayDialog: boolean = false;

  public selectedAddStatement: PocketixVPStatementLanguage & { id: string };

  public recommendedAddStatements: (PocketixVPStatementLanguage & { id: string })[] = [];

  constructor() { }

  ngOnInit(): void {
    this.reloadAddStatements();
  }

  protected reloadAddStatements(): void {
  }

  public up(statement: PocketixVPStatement, i: number) {
    if(i > 0) {
      const newBlock = [...this.block];
      [newBlock[i - 1], newBlock[i]] = [newBlock[i], newBlock[i - 1]];
      this.replaceBlock(newBlock);
    }
  }

  public down(statement: PocketixVPStatement, i: number) {
    if(i < this.block.length-1) {
      const newBlock = [...this.block];
      [newBlock[i], newBlock[i + 1]] = [newBlock[i + 1], newBlock[i]];
      this.replaceBlock(newBlock);
    }
  }

  public delete(statement: PocketixVPStatement, i: number) {
    const newBlock = [...this.block];
    newBlock.splice(i, 1);
    this.replaceBlock(newBlock);
  }

  public add() {
    if(this.selectedAddStatement) {
      const newBlock = [...this.block, {
        name: this.selectedAddStatement.id
      }];
      this.replaceBlock(newBlock);
    }
  }

  private replaceBlock(newBlock: PocketixVPBlock) {
    this.block = newBlock;
    this.blockChange.emit(newBlock);
    this.update();
  }

  public trackByIndex(index: number): number {
    return index;
  }

  public searchSuggestedValues(value) {
    let query = ((value.query) as String).toLowerCase()
    
    // recommended statements
    this.recommendedAddStatements = [];

    // built-in statement models
    Object.entries(this.language.statements).forEach(([key, val]) => {
      if(
        (!val.levels || val.levels.includes(this.level)) &&
        (!val.avoidLevels || !val.avoidLevels.includes(this.level)) &&
        (!val.parents || val.parents.includes(this.parent.name)) &&
        (!val.avoidParents || !val.avoidParents.includes(this.parent.name)))
      {
        if(key.startsWith(query)) {
          this.recommendedAddStatements.push({
            id: key,
            ...val
          });
        }
      }
    });
  }

  update() {
    this.onUpdate.emit();
  }

}
