import {Device} from "../generated/models/device";
import {capabilityTemplate} from "./capabilityTemplate";
import {PocketixVPStatementLanguage} from "pocketixng";

const createCapabilitiesFromDeviceAndCapabilityTemplate = (device: Device): (PocketixVPStatementLanguage & {capabilityId: string })[] => {
  const deviceName = device.deviceName.replace(/[\s-+*/.]/g, "");
  return device.capabilities?.map(capability => ({
    ...capabilityTemplate,
    label: `${deviceName}.${capability.name}`,
    name: `${deviceName}.${capability.name}`,
    capabilityId: `${device.deviceUid}.${capability.id}`
  })) || [];
}

export {createCapabilitiesFromDeviceAndCapabilityTemplate};
