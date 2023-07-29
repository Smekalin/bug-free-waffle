import { Subject } from 'rxjs';
import { TickInfo } from '../../../models/tick-info/tick-info';
import { Payload } from '../calculation.helper';

export interface ITickDataCalculation {
  getStream(): Subject<TickInfo[]>;

  send: (payload: Payload) => void;
}
