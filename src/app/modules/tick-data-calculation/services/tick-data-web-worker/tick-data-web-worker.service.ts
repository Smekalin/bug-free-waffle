import { inject, Injectable, NgZone } from '@angular/core';
import { ITickDataCalculation } from '../../interfaces/tick-data-calculation.interface';
import { Subject } from 'rxjs';
import { TickInfo } from '../../../../models/tick-info/tick-info';
import { Payload } from '../../calculation.helper';

@Injectable({
  providedIn: 'root',
})
export class TickDataWebWorkerService implements ITickDataCalculation {
  private worker: Worker;
  private readonly stream$: Subject<TickInfo[]>;

  // NOTE: костыльные попытки в оптимизацию
  private ngZone = inject(NgZone);
  private isLoading = false;

  getStream(): Subject<TickInfo[]> {
    return this.stream$;
  }

  constructor() {
    this.worker = this.createWorker();
    this.stream$ = new Subject<TickInfo[]>();
    this.initWorkerHandler();
  }

  send(payload: Payload): void {
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;
    this.worker.terminate();
    this.worker = this.createWorker();
    this.initWorkerHandler();
    this.worker.postMessage(payload);
  }

  private initWorkerHandler(): void {
    this.ngZone.runOutsideAngular(() => {
      this.worker.onmessage = (event: MessageEvent<TickInfo[]>) => {
        this.stream$.next(event.data);
        this.isLoading = false;
      };
    });
  }

  private createWorker(): Worker {
    return new Worker(new URL('./tick-data.worker', import.meta.url));
  }
}
