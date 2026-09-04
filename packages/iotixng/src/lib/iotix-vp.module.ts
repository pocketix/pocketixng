import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IotixVpStatementComponent } from './components/iotix-vp-statement/iotix-vp-statement.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IotixVpCmdStatementComponent } from './components/iotix-vp-cmd-statement/iotix-vp-cmd-statement.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { IotixVpExpressionComponent } from './components/iotix-vp-expression/iotix-vp-expression.component';
import { IotixVpBlockComponent } from './components/iotix-vp-block/iotix-vp-block.component';
import { DialogModule } from 'primeng/dialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { IotixVpCompoundStatementComponent } from './components/iotix-vp-compound-statement/iotix-vp-compound-statement.component';
import { IotixVpTostringPipe } from './pipes/iotix-vp-tostring.pipe';
import { IotixVpTestposPipe } from './pipes/iotix-vp-testpos.pipe';
import { IotixVpProgramComponent } from './components/iotix-vp-program/iotix-vp-program.component';
import { IotixVpGeneratePipe } from './pipes/iotix-vp-generate.pipe';
import { IotixVpTextEditorComponent } from './components/iotix-vp-text-editor/iotix-vp-text-editor.component';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    IotixVpBlockComponent,
    IotixVpCmdStatementComponent,
    IotixVpCompoundStatementComponent,
    IotixVpExpressionComponent,
    IotixVpProgramComponent,
    IotixVpStatementComponent,
    IotixVpTestposPipe,
    IotixVpTostringPipe,
    IotixVpGeneratePipe,
    IotixVpTextEditorComponent
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
    IotixVpBlockComponent,
    IotixVpCmdStatementComponent,
    IotixVpCompoundStatementComponent,
    IotixVpExpressionComponent,
    IotixVpProgramComponent,
    IotixVpStatementComponent,
    IotixVpTextEditorComponent,
    IotixVpGeneratePipe,
    IotixVpTestposPipe,
    IotixVpTostringPipe,
  ]
})
export class IotixVpModule { }
