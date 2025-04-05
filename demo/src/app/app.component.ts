import { Component, ViewChild } from '@angular/core';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { defaultProgram } from './util/defaultProgram';
import { defaultMetaLanguage } from './util/defaultMetaLanguage';
import {
    readableToSerializedCapabilityAndVariablesReplacer,
    serializedToReadableCapabilityAndVariablesReplacer
} from './util/capabilityAndVariablesReplacers';
import {PocketixVPProgram} from "../../../packages/pocketixng/src/lib/model/pocketix-vp-program.model";
import {
    PocketixVPStatementLanguage,
    PocketixVPVariable
} from "../../../packages/pocketixng/src/lib/model/pocketix-vp-language.model";
import {ProgramService} from "./generated/services/program.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [MessageService]
})
export class AppComponent {
    program: PocketixVPProgram = defaultProgram;
    metaLanguage = defaultMetaLanguage;
    capabilities: (PocketixVPStatementLanguage & { capabilityId: string })[] = [];
    variables: PocketixVPVariable[] = [];
    evaluateButtonEnabled = false;

    @ViewChild('toast') toast: Toast | undefined;

    constructor(private messageService: MessageService, private programService: ProgramService) {

    }

    onProgramChange(program: PocketixVPProgram) {
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
