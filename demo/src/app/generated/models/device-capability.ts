/* tslint:disable */
/* eslint-disable */
import { CapabilityParameter } from './capability-parameter';
import { CapabilityType } from './capability-type';
import { Device } from './device';
export interface DeviceCapability {
  device: Device;
  id: number;
  name: string;
  parameters: Array<CapabilityParameter>;
  type: CapabilityType;
}
