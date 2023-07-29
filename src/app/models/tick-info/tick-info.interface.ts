import { Color } from '../../interfaces/tick-info.interface';

export type ChildTick = { id: string; color: Color };

export interface ITickInfo {
  id: string;
  int: number;
  float: string;
  color: Color;
  child: ChildTick;
}
