import {
    PocketixVPStatementLanguage,
    PocketixVPVariable
} from "../../../../packages/pocketixng/src/lib/model/pocketix-vp-language.model";
import {
    PocketixVPProgram,
    PocketixVPStatement
} from "../../../../packages/pocketixng/src/lib/model/pocketix-vp-program.model";

const serializedToReadableCapabilityAndVariablesReplacer = (program: PocketixVPProgram,
                                                            capabilities: ((PocketixVPStatementLanguage & { capabilityId: string })[]),
                                                            variables: PocketixVPVariable[]) => {
    let programAsString = JSON.stringify(program);

    capabilities.forEach(item => programAsString = programAsString
        .replaceAll(item.capabilityId, item.name));
    variables.forEach(item => programAsString = programAsString.replaceAll(item.id, item.label));

    return JSON.parse(programAsString);
};

const readableToSerializedCapabilityAndVariablesReplacer = (program: PocketixVPProgram,
                                                            capabilities: ((PocketixVPStatementLanguage & { capabilityId: string })[]),
                                                            variables: PocketixVPVariable[]) => {
    let programAsString = JSON.stringify(program);

    capabilities.forEach(item => programAsString = programAsString
        .replaceAll(item.name, item.capabilityId));
    variables.forEach(item => programAsString = programAsString.replaceAll(item.label, item.id));

    return JSON.parse(programAsString);
};


export {serializedToReadableCapabilityAndVariablesReplacer, readableToSerializedCapabilityAndVariablesReplacer};
