/// <reference lib="webworker" />

import { calculate } from '../../calculation.helper';
import { ITickInfo } from '../../../../models/tick-info/tick-info.interface';
import { Config } from '../../../../interfaces/tick-info.interface';

export type PayloadStringify = { data: string; config: { ids: Config['additionalIds'] } };

addEventListener('message', ({ data }: MessageEvent<PayloadStringify>) => {
  const d = JSON.parse(data.data) as ITickInfo[];
  const map = fillMap(d);

  postMessage(calculate(map, { data: d, config: data.config }));
});

function fillMap(data: ITickInfo[]): Map<ITickInfo['id'], ITickInfo> {
  const map = new Map<ITickInfo['id'], ITickInfo>();

  data.forEach(tick => {
    map.set(tick.id, tick);
  });

  return map;
}
