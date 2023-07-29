import { Color } from '../../interfaces/tick-info.interface';
import { ChildTick, ITickInfo } from './tick-info.interface';

export class TickInfo {
  id: string;
  int: number;
  float: bigint;
  color: Color;
  child: ChildTick;

  constructor(data: ITickInfo) {
    const { id, int, float, color, child } = data;
    this.id = id;
    this.int = int;
    this.float = BigInt(float);
    this.color = color;
    this.child = child;
  }
}
