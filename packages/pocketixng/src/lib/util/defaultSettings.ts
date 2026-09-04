import { PocketixVPSettings } from '../model/pocketix-vp-settings.model';

const defaultSettings: PocketixVPSettings = {
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
