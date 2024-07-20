
export type PocketixVPSettings = {
    menu?: PocketixVPMenuSettings,
    visualEditor?: PocketixVPVisualEditorSettings,
    textEditor?: PocketixVPTextEditorSettings
    common: {
        manualSync: boolean
    }
}

export type PocketixVPMenuSettings = {
    enabled: boolean,
    enableToggleVisual: boolean,
    enableSaveVisual: boolean,
    enableUndo: boolean,
    enableRedo: boolean,
    enableSync: boolean,
    enableSaveText: boolean,
    enableToggleText: boolean,
    enableLang: boolean
}

export type PocketixVPVisualEditorSettings = {
    enabled: boolean
}

export type PocketixVPTextEditorSettings = {
    enabled: boolean,
    style: {
        [klass: string]: any;
    }
}