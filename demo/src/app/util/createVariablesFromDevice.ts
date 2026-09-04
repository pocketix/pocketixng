import {PocketixVPVariable} from "pocketixng";
import {Device} from "../generated/models/device";

const createVariablesFromDevice = (device: Device): PocketixVPVariable[] => {
  // Matches createCapabilitiesFromDeviceAndCapabilityTemplate.ts's
  // sanitization - an unsanitized device name containing a space embeds an
  // invalid token into condition strings once its label is substituted in.
  const deviceName = device.deviceName.replace(/[\s\-+*/.]/g, "");

  return device.parameterValues?.map(parameter => ({
    id: `${device.deviceUid}.${parameter.type.name}`,
    label: `${deviceName}.${parameter.type.label}`
  })) || [];
}

export {createVariablesFromDevice};
