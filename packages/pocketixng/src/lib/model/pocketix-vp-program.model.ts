export type PocketixVPProgram = {
    header: PocketixBPHeader,
    block: PocketixVPBlock
};

export type PocketixBPHeader = {
    // TODO
}

export type PocketixVPBlock = PocketixVPStatement[];

export type PocketixVPStatement = PocketixVPAbstractStatement | (PocketixVPCompoundStatement | PocketixVPCommand);

export type PocketixVPAbstractStatement = {
    name: string
}

export type PocketixVPCompoundStatement = PocketixVPAbstractStatement & {
    condition?: PocketixVPExpression,
    block: PocketixVPBlock
}

export type PocketixVPCommand = PocketixVPAbstractStatement & {
    params: PocketixVPExpression[]
}

export type PocketixVPExpression = number | string | boolean; // TODO