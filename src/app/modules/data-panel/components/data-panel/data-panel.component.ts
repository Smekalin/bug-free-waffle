import { ChangeDetectionStrategy, Component, Inject, OnInit, Self } from '@angular/core';
import { TickInfoWebsocketService } from 'src/app/services/tick-info/tick-info-websocket.service';
import { combineLatest, filter, Observable, startWith, Subject, takeUntil, tap } from 'rxjs';
import { ITickDataCalculation } from '../../../tick-data-calculation/interfaces/tick-data-calculation.interface';
import { TICK_DATA_CALCULATION_TOKEN } from './token';
import { ITickInfo } from '../../../../models/tick-info/tick-info.interface';
import { TickInfo } from '../../../../models/tick-info/tick-info';
import { FormControl } from '@angular/forms';
import { TuiDestroyService } from '@taiga-ui/cdk';

const TIMER_DEFAULT_MS = 1_000;
const ARRAY_SIZE = 10_000;
const ADDITIONAL_IDS: string[] = [];

@Component({
  selector: 'app-data-panel',
  templateUrl: './data-panel.component.html',
  styleUrls: ['./data-panel.component.less'],
  providers: [TuiDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataPanelComponent implements OnInit {
  sourceData$?: Subject<ITickInfo[]>;
  calculatedData$: Subject<TickInfo[]>;

  readonly timerValueControl = new FormControl<number>(TIMER_DEFAULT_MS);
  readonly arraySizeControl = new FormControl<number>(ARRAY_SIZE);
  readonly additionalIdsControl = new FormControl<string[]>(ADDITIONAL_IDS);

  timerControlValue$: Observable<number> = this.initTimerControl();
  arraySizeControlValue$: Observable<number> = this.initArraySizeControl();
  additionalIdsControlValue$: Observable<string[]> = this.initAdditionalIdsControl();

  constructor(
    @Inject(TICK_DATA_CALCULATION_TOKEN)
    private tickDataCalculator: ITickDataCalculation,
    readonly tickInfoWebsocketService: TickInfoWebsocketService,
    @Self()
    @Inject(TuiDestroyService)
    private readonly destroy$: TuiDestroyService,
  ) {
    this.calculatedData$ = this.tickDataCalculator.getStream();
  }

  ngOnInit() {
    this.initDataSourceConnection();

    this.initConfigHandler();
  }

  initConfigHandler(): void {
    combineLatest([this.timerControlValue$, this.arraySizeControlValue$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([timer, arraySize]) => {
        this.tickInfoWebsocketService.updateConfig({
          timer: timer,
          size: arraySize,
        });
      });
  }

  initDataSourceConnection(): void {
    this.sourceData$ = this.tickInfoWebsocketService.getConnection();

    combineLatest([this.sourceData$, this.additionalIdsControlValue$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([data, additionalIds]) => {
        this.tickDataCalculator.send({
          data: data as ITickInfo[],
          config: { ids: additionalIds as ITickInfo['id'][] },
        });
      });
  }

  private initTimerControl(): Observable<number> {
    return this.timerValueControl.valueChanges.pipe(
      startWith(TIMER_DEFAULT_MS),
      isNotNullOrUndefined(),
    );
  }

  private initArraySizeControl(): Observable<number> {
    return this.arraySizeControl.valueChanges.pipe(startWith(ARRAY_SIZE), isNotNullOrUndefined());
  }

  private initAdditionalIdsControl(): Observable<TickInfo['id'][]> {
    return this.additionalIdsControl.valueChanges.pipe(
      startWith(ADDITIONAL_IDS),
      isNotNullOrUndefined(),
    );
  }
}

export function isNotNullOrUndefined<T>() {
  return (source$: Observable<null | undefined | T>): Observable<T> => {
    return source$.pipe(filter(isNotNil));
  };
}

export function isNotNil<T>(x: T | undefined | null): x is T {
  return x !== undefined && x !== null;
}
