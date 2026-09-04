import { Type } from "@angular/core"

export type IoTiXVPLanguage = {
    variables: IoTiXVPVariable[];
    statements: {
        [name: string]: IoTiXVPStatementLanguage
    },
    err: {
        icon: string,
        color: string,
        backgroundColor: string,
    }
}

export type IoTiXVPVariable = {
    label: string,
    id?: string
}

export type IoTiXVPStatementLanguage = {
    component: "cmd" | "compound",
    label?: string,
    name?: string,
    icon?: string,
    color?: string,
    backgroundColor?: string,
    parents?: string[],
    avoidParents?: string[],
    positions?: IoTiXVPPreferredPosition[],
    avoidPositions?: IoTiXVPPreferredPosition[],
    levels?: number[],
    avoidLevels?: number[],
    extensions?: IoTiXVPCommandExtensionsLanguage & IoTiXVPConditionExtensionsLanguage
}

export type IoTiXVPPreferredPosition = (number | "first" | "middle" | "last" );

export type IoTiXVPCommandExtensionsLanguage = ({
    params?: {
        type: "structure"
        defs: {
            name: string,
            type: Type<Number | String | Boolean>
        }[]
    }
} | {
    params?: {
        type: "array"
        defs: Type<Number | String | Boolean>
    }
})

export type IoTiXVPConditionExtensionsLanguage = {
    enableCondition?: boolean
}