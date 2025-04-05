/* tslint:disable */
/* eslint-disable */
import { DeviceCapability } from './device-capability';
import { DeviceType } from './device-type';
import { Group } from './group';
import { ParameterValue } from './parameter-value';
export interface Device {
  capabilities?: Array<DeviceCapability>;

  /**
   * Human friendly device description
   */
  description: string;

  /**
   * Human friendly device name
   */
  deviceName: string;

  /**
   * Device identifier or serial number
   */
  deviceUid: string;
  groups: Array<Group>;

  /**
   * Device image
   */
  image?: string;

  /**
   * Device Last seen at
   */
  lastSeenDate: string;

  /**
   * Device latitude coordinate
   */
  latitude: number;

  /**
   * Device longitude coordinate
   */
  longitude: number;

  /**
   * Last device parameter values
   */
  parameterValues?: Array<ParameterValue>;

  /**
   * Device registered at
   */
  registrationDate: string;

  /**
   * Device type
   */
  type: DeviceType;
}
