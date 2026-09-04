import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PocketixVPBlock, PocketixVPStatement, } from '../../model/pocketix-vp-program.model';
import { PocketixVPLanguage, PocketixVPStatementLanguage } from '../../model/pocketix-vp-language.model';
import { captureAnalyticsEvent } from '../../util/analytics';

@Component({
  selector: 'pocketix-vp-block',
  templateUrl: './pocketix-vp-block.component.html',
  styleUrls: ['./pocketix-vp-block.component.css']
})
export class PocketixVpBlockComponent {

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

  public up(statement: PocketixVPStatement, i: number) {
    if(i > 0) {
      const newBlock = [...this.block];
      [newBlock[i - 1], newBlock[i]] = [newBlock[i], newBlock[i - 1]];
      this.replaceBlock(newBlock);

      captureAnalyticsEvent('moved_statement', {
        movement: 'moved_up',
        timestamp: new Date().toISOString(),
        vpl_version: 'vpl_ng'
      });
    }
  }

  public down(statement: PocketixVPStatement, i: number) {
    if(i < this.block.length-1) {
      const newBlock = [...this.block];
      [newBlock[i], newBlock[i + 1]] = [newBlock[i + 1], newBlock[i]];
      this.replaceBlock(newBlock);

      captureAnalyticsEvent('moved_statement', {
        movement: 'moved_down',
        timestamp: new Date().toISOString(),
        vpl_version: 'vpl_ng'
      });
    }
  }

  public delete(statement: PocketixVPStatement, i: number) {
    captureAnalyticsEvent('removed_statement', {
      type: this.block[i].name,
      timestamp: new Date().toISOString(),
      vpl_version: 'vpl_ng'
    });

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

      captureAnalyticsEvent('added_statement', {
        statement: this.selectedAddStatement.id,
        timestamp: new Date().toISOString(),
        vpl_version: 'vpl_ng'
      });
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
