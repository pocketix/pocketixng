import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PocketixVpStatementComponent } from './components/pocketix-vp-statement/pocketix-vp-statement.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PocketixVpCmdStatementComponent } from './components/pocketix-vp-cmd-statement/pocketix-vp-cmd-statement.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PocketixVpExpressionComponent } from './components/pocketix-vp-expression/pocketix-vp-expression.component';
import { PocketixVpBlockComponent } from './components/pocketix-vp-block/pocketix-vp-block.component';
import { DialogModule } from 'primeng/dialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PocketixVpCompoundStatementComponent } from './components/pocketix-vp-compound-statement/pocketix-vp-compound-statement.component';
import { PocketixVpTostringPipe } from './pipes/pocketix-vp-tostring.pipe';
import { PocketixVpTestposPipe } from './pipes/pocketix-vp-testpos.pipe';
import { PocketixVpProgramComponent } from './components/pocketix-vp-program/pocketix-vp-program.component';
import { PocketixVpGeneratePipe } from './pipes/pocketix-vp-generate.pipe';
import { PocketixVpTextEditorComponent } from './components/pocketix-vp-text-editor/pocketix-vp-text-editor.component';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    PocketixVpBlockComponent,
    PocketixVpCmdStatementComponent,
    PocketixVpCompoundStatementComponent,
    PocketixVpExpressionComponent,
    PocketixVpProgramComponent,
    PocketixVpStatementComponent,
    PocketixVpTestposPipe,
    PocketixVpTostringPipe,
    PocketixVpGeneratePipe,
    PocketixVpTextEditorComponent
  ],
  imports: [
    AutoCompleteModule,
    BrowserAnimationsModule,
    BrowserModule,
    ButtonModule,
    CommonModule,
    DialogModule,
    DropdownModule,
    FormsModule,
    InputTextareaModule,
    InputTextModule,
    ToggleButtonModule
  ],
  exports: [
    PocketixVpBlockComponent,
    PocketixVpCmdStatementComponent,
    PocketixVpCompoundStatementComponent,
    PocketixVpExpressionComponent,
    PocketixVpProgramComponent,
    PocketixVpStatementComponent,
    PocketixVpGeneratePipe,
  ]
})
export class PocketixVpModule { }
