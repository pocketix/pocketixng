export type PocketixVPProgram = {
    block: PocketixVPBlock
};

export type PocketixVPBlock = PocketixVPStatement[];

export type PocketixVPStatement = PocketixVPAbstractStatement | (PocketixVPCompoundStatement | PocketixVPCommand);

export type PocketixVPAbstractStatement = {
    component?: string;
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