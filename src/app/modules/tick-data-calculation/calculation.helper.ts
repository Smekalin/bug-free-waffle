import { Config } from '../../interfaces/tick-info.interface';
import { ITickInfo } from '../../models/tick-info/tick-info.interface';
import { TickInfoBuilder } from '../../models/tick-info/tick-info.builder';
import { TickInfo } from '../../models/tick-info/tick-info';

const MAX_LENGTH_OF_TICKS = 10;

export type Payload = { data: ITickInfo[]; config: { ids: Config['additionalIds'] } };

export function calculate(
  map: Map<ITickInfo['id'], ITickInfo>,
  { data, config }: Payload,
): TickInfo[] {
  const ids = config.ids;
  const additionalTicksIds = ids
    .map(id => map.get(id))
    .filter<ITickInfo>(filterEmptyTicks)
    .map(item => item.id);
  const tailIds = data.slice(-1 * MAX_LENGTH_OF_TICKS).map(item => item.id);
  const uniqueIds = [...new Set(additionalTicksIds.concat(tailIds))];
  return uniqueIds.slice(0, MAX_LENGTH_OF_TICKS).map(id => TickInfoBuilder(map.get(id)!));
}

function filterEmptyTicks(T: ITickInfo | undefined): T is ITickInfo {
  return T !== undefined;
}
