import { IoTiXVPSettings } from '../model/iotix-vp-settings.model';

const defaultSettings: IoTiXVPSettings = {
  menu: {
    enabled: true,
    enableToggleVisual: true,
    enableSaveVisual: true,
    enableUndo: true,
    enableRedo: true,
    enableSync: true,
    enableSaveText: true,
    enableToggleText: true,
    enableLang: true
  },
  visualEditor: {
    enabled: true
  },
  textEditor: {
    enabled: false,
    style: {}
  },
  analytics: {
    enabled: false
  },
  common: {
    manualSync: false
  }
};

export { defaultSettings };
