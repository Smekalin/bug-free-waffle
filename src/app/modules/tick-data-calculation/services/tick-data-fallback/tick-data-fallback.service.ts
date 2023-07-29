import { Injectable } from '@angular/core';
import { ITickDataCalculation } from '../../interfaces/tick-data-calculation.interface';
import { Subject } from 'rxjs';
import { TickInfo } from '../../../../models/tick-info/tick-info';
import { calculate, Payload } from '../../calculation.helper';
import { ITickInfo } from '../../../../models/tick-info/tick-info.interface';

@Injectable({
  providedIn: 'root',
})
export class TickDataFallbackService implements ITickDataCalculation {
  private readonly stream$: Subject<TickInfo[]>;

  constructor() {
    this.stream$ = new Subject<TickInfo[]>();
  }

  getStream(): Subject<TickInfo[]> {
    return this.stream$;
  }

  send(payload: Payload): void {
    const map = fillMap(payload.data);
    const convertedData = calculate(map, payload);
    this.stream$.next(convertedData);
  }
}

function fillMap(data: ITickInfo[]): Map<ITickInfo['id'], ITickInfo> {
  let i = 0;
  const map = new Map();

  function fill() {
    while (i % 1000 !== 0) {
      i++;
      map.set(data[i], data);
    }
    if (i < data.length) setTimeout(fill);
  }

  fill();

  return map;
}
