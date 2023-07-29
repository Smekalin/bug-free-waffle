import { inject, Injectable, NgZone, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Config, Timer } from '../../interfaces/tick-info.interface';
import { ITickInfo } from '../../models/tick-info/tick-info.interface';

@Injectable()
export class TickInfoWebsocketService implements OnDestroy {
  private worker = this.createWorker();
  private subject: Subject<ITickInfo[]>;
  private timer?: Timer;

  // NOTE: костыльные попытки в оптимизацию
  private ngZone = inject(NgZone);
  private isLoading = false;

  constructor() {
    this.subject = this.initSocket();
    const config = getDefaultConfig();
    this.updateSocketConfig(config);
  }

  ngOnDestroy(): void {
    this.close(this.timer);
  }

  getConnection(): Subject<ITickInfo[]> {
    return this.subject;
  }

  updateConfig(config: Omit<Config, 'additionalIds'>): void {
    this.updateSocketConfig(config);
  }

  close(timer?: Timer): void {
    clearInterval(timer);
  }

  private initSocket(): Subject<ITickInfo[]> {
    if (!this.subject) {
      this.subject = new Subject<ITickInfo[]>();
    }
    return this.subject;
  }

  private updateSocketConfig(config: Omit<Config, 'additionalIds'>): void {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      if (this.isLoading) {
        return;
      }

      this.sendMockData(config);
    }, config.timer);
  }

  private sendMockData(config: Omit<Config, 'additionalIds'>): void {
    this.isLoading = true;
    this.worker.terminate();
    this.worker = this.createWorker();
    this.initWorkerHandler();
    this.worker.postMessage(config.size);
  }

  private initWorkerHandler(): void {
    this.ngZone.runOutsideAngular(() => {
      this.worker.onmessage = (event: MessageEvent<ITickInfo[]>) => {
        this.subject.next(event.data);
        this.isLoading = false;
      };
    });
  }

  private createWorker(): Worker {
    return new Worker(new URL('./mock-data.worker', import.meta.url));
  }
}

function getDefaultConfig(): Config {
  return {
    size: 10,
    timer: 5000,
    additionalIds: [],
  };
}
