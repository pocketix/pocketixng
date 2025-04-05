import { Type } from "@angular/core"

export type PocketixVPLanguage = {
    variables: PocketixVPVariable[];
    statements: {
        [name: string]: PocketixVPStatementLanguage
    },
    err: {
        icon: string,
        color: string,
        backgroundColor: string,
    }
}

export type PocketixVPVariable = {
    label: string,
    id?: string
}

export type PocketixVPStatementLanguage = {
    component: "cmd" | "compound",
    label?: string,
    name?: string,
    icon?: string,
    color?: string,
    backgroundColor?: string,
    parents?: string[],
    avoidParents?: string[],
    positions?: PocketixVPPreferredPosition[],
    avoidPositions?: PocketixVPPreferredPosition[],
    levels?: number[],
    avoidLevels?: number[],
    extensions?: PocketixVPCommandExtensionsLanguage & PocketixVPConditionExtensionsLanguage
}

export type PocketixVPPreferredPosition = (number | "first" | "middle" | "last" );

export type PocketixVPCommandExtensionsLanguage = ({
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

export type PocketixVPConditionExtensionsLanguage = {
    enableCondition?: boolean
}