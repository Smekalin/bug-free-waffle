import { ITickInfo } from './tick-info.interface';
import { TickInfo } from './tick-info';

export function TickInfoBuilder(data: ITickInfo): TickInfo {
  const { id, child } = data;
  if (id === undefined) throw new Error('Tick info must contains required field "id"');
  if (child === undefined) throw new Error('Tick info must contains required field "child"');
  if (child.id === undefined) throw new Error('Child field must contains required field "id"');

  return new TickInfo(data);
}
