export type IoTiXVPProgram = {
    block: IoTiXVPBlock
};

export type IoTiXVPBlock = IoTiXVPStatement[];

export type IoTiXVPStatement = IoTiXVPAbstractStatement | (IoTiXVPCompoundStatement | IoTiXVPCommand);

export type IoTiXVPAbstractStatement = {
    component?: string;
    name: string
}

export type IoTiXVPCompoundStatement = IoTiXVPAbstractStatement & {
    condition?: IoTiXVPExpression,
    block: IoTiXVPBlock
}

export type IoTiXVPCommand = IoTiXVPAbstractStatement & {
    params: IoTiXVPExpression[]
}

export type IoTiXVPExpression = number | string | boolean; // TODO