import { ITickInfo } from '../models/tick-info/tick-info.interface';

export type Color = string;

type MilliSeconds = number;

export interface Config {
  timer: MilliSeconds;
  size: number;
  additionalIds: Array<ITickInfo['id']>;
}

export type Timer = ReturnType<typeof setInterval>;
