
export type IoTiXVPSettings = {
    menu?: IoTiXVPMenuSettings,
    visualEditor?: IoTiXVPVisualEditorSettings,
    textEditor?: IoTiXVPTextEditorSettings
    analytics?: IoTiXVPAnalyticsSettings
    common: {
        manualSync: boolean
    }
}

export type IoTiXVPAnalyticsSettings = {
    enabled: boolean
}

export type IoTiXVPMenuSettings = {
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

export type IoTiXVPVisualEditorSettings = {
    enabled: boolean
}

export type IoTiXVPTextEditorSettings = {
    enabled: boolean,
    style: {
        [klass: string]: any;
    }
}