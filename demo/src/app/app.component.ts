import { Component, ViewChild } from '@angular/core';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { defaultProgram } from './util/defaultProgram';
import { defaultMetaLanguage } from './util/defaultMetaLanguage';
import {
    readableToSerializedCapabilityAndVariablesReplacer,
    serializedToReadableCapabilityAndVariablesReplacer
} from './util/capabilityAndVariablesReplacers';
import {
    IoTiXVPProgram,
    IoTiXVPStatementLanguage,
    IoTiXVPVariable
} from "iotixng";
import {ProgramService} from "./generated/services/program.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [MessageService],
    standalone: false
})
export class AppComponent {
    program: IoTiXVPProgram = defaultProgram;
    metaLanguage = defaultMetaLanguage;
    capabilities: (IoTiXVPStatementLanguage & { capabilityId: string })[] = [];
    variables: IoTiXVPVariable[] = [];
    evaluateButtonEnabled = false;

    @ViewChild('toast') toast: Toast | undefined;

    constructor(private messageService: MessageService, private programService: ProgramService) {

    }

    onProgramChange(program: IoTiXVPProgram) {
        this.program = program;
        this.evaluateButtonEnabled = true;
    }

    onMetaLanguageChange(meta: any) {
        this.metaLanguage = meta;
    }

    onCapabilitiesChange(capabilities: any) {
        this.capabilities = capabilities;
    }

    onVariablesChange(variables: any) {
        this.variables = variables;
    }

    onProgramTrigger() {
        const evaluableProgram = readableToSerializedCapabilityAndVariablesReplacer(
            this.program, this.capabilities, this.variables
        );

        this.programService.v1RunProgram(evaluableProgram).toPromise().then((value: any) => {
            const commands = serializedToReadableCapabilityAndVariablesReplacer(
                value, this.capabilities, this.variables
            );

            for (const command of commands) {
                this.messageService.add({
                    severity: 'info',
                    summary: 'Triggered capabilities',
                    detail: `Triggered capability ${command.name} with parameters ${JSON.stringify(command.params)}`
                });
            }
        }).catch(error => console.error(error));
    }
}
