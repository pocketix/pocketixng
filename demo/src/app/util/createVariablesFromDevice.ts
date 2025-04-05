import {PocketixVPVariable} from "../../../../packages/pocketixng/src/lib/model/pocketix-vp-language.model";
import {Device} from "../generated/models/device";

const createVariablesFromDevice = (device: Device): PocketixVPVariable[] => device.parameterValues?.map(parameter => ({
  id: `${device.deviceUid}.${parameter.type.name}`,
  label: `${device.deviceName}.${parameter.type.label}`
})) || []

export {createVariablesFromDevice};
