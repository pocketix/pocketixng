import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {createVariablesFromDevice} from '../../util/createVariablesFromDevice';
import {
    createCapabilitiesFromDeviceAndCapabilityTemplate
} from '../../util/createCapabilitiesFromDeviceAndCapabilityTemplate';
import {serializedToReadableCapabilityAndVariablesReplacer} from '../../util/capabilityAndVariablesReplacers';
import {
    PocketixVPLanguage, PocketixVPStatementLanguage,
    PocketixVPVariable
} from "../../../../../packages/pocketixng/src/lib/model/pocketix-vp-language.model";
import {PocketixVPStatement} from "../../../../../packages/pocketixng/src/lib/model/pocketix-vp-program.model";
import {Group} from "../../generated/models/group";
import {Program} from "../../generated/models/program";
import {Version} from '../../generated/models';
import {GroupService} from "../../generated/services/group.service";
import {ProgramService} from "../../generated/services/program.service";

@Component({
    selector: 'app-more',
    templateUrl: './more.component.html',
    styleUrls: ['./more.component.css']
})
export class MoreComponent implements OnInit {
    visible = false;

    selectedGroup?: Group;
    groups: Group[] = [];
    groupsError = '';
    groupById: Group | null = null;
    groupsByIdError = '';

    programs: Program[] = [];
    capabilities: (PocketixVPStatementLanguage & {
        capabilityId: string
    })[] = [];
    variables: PocketixVPVariable[] = [];

    activeProgramIndex?: number;

    metaLanguage?: PocketixVPLanguage;
    currentMetaLanguageVersion?: Version;

    @Output() onProgramChange = new EventEmitter<any>();
    @Output() onMetaLanguageChange = new EventEmitter<PocketixVPLanguage>();
    @Output() onCapabilitiesChange = new EventEmitter<any>();
    @Output() onVariablesChange = new EventEmitter<PocketixVPVariable[]>();

    constructor(private groupService: GroupService, private programService: ProgramService) {}

    ngOnInit(): void {
        this.fetchGroups();
    }

    showDialog(event: Event): void {
        event.preventDefault();
        this.visible = true;
    }

    hideDialog(event: Event): void {
        event.preventDefault();
        this.visible = false;
    }

    fetchGroups(): void {
        this.groupService.getAllGroups({includeDevices: false}).toPromise().then(groupsFromApi => {
            this.groups = groupsFromApi;
        }).catch(error => {
            this.groupsError = error.message;
        });
    }

    onGroupSelected(): void {
        if (!this.selectedGroup) return;

        this.groupService.getGroup({id: this.selectedGroup.id, includeDevices: false}).toPromise().then(groupFromApi => {
            this.groupById = groupFromApi;

            const newVariables = groupFromApi.devices.flatMap(createVariablesFromDevice);
            const newCapabilities = groupFromApi.devices.flatMap(createCapabilitiesFromDeviceAndCapabilityTemplate);

            this.variables = newVariables;
            this.capabilities = newCapabilities;

            this.onVariablesChange.emit(newVariables);
            this.onCapabilitiesChange.emit(newCapabilities);

            this.setActiveProgram(0);
            this.fetchPrograms();
        }).catch(error => {
            this.groupsByIdError = error.message;
        });
    }

    fetchPrograms(): void {
        if (!this.selectedGroup) return;

        this.programService.getProgramOfGroup({id: this.selectedGroup.id}).toPromise().then(programsFromApi => {
            this.programs = programsFromApi.map(program => ({
                ...program,
                data: serializedToReadableCapabilityAndVariablesReplacer(program.data, this.capabilities, this.variables)
            }));
            this.setActiveProgram(0);
        }).catch(error => {
            this.groupsByIdError = error.message;
        });
    }

    setActiveProgram(index: number): void {
        const selected = this.programs[index];
        this.activeProgramIndex = index;

        if (selected.version === this.currentMetaLanguageVersion) return;

        this.currentMetaLanguageVersion = selected.version;
        this.programService.getMetaLanguage({version: selected.version}).toPromise().then(metaLang => {
            this.metaLanguage = metaLang;
        }).catch(error => {
            this.groupsByIdError = error.message;
        });
    }

    updateProgramAndMetaLanguage(): void {
        if (this.activeProgramIndex === undefined || !this.metaLanguage) return;

        const updatedMetaLang = { ...this.metaLanguage };
        updatedMetaLang.variables = this.variables;

        this.capabilities.forEach(c => {
            updatedMetaLang.statements[c.name] = c;
        });

        this.onMetaLanguageChange.emit(updatedMetaLang);
        this.onProgramChange.emit(this.programs[this.activeProgramIndex].data);
    }
}