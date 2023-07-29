import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataPanelComponent } from './components/data-panel/data-panel.component';
import { TickInfoWebsocketService } from 'src/app/services/tick-info/tick-info-websocket.service';
import { ITickDataCalculation } from '../tick-data-calculation/interfaces/tick-data-calculation.interface';
import { TickDataFallbackService } from '../tick-data-calculation/services/tick-data-fallback/tick-data-fallback.service';
import { TickDataWebWorkerService } from '../tick-data-calculation/services/tick-data-web-worker/tick-data-web-worker.service';
import { TICK_DATA_CALCULATION_TOKEN } from './components/data-panel/token';
import { ChildTableComponent } from './components/table/components/child-table.component';
import { TickInfoComponent } from './components/table/tick-info.component';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiInputNumberModule, TuiInputTagModule } from '@taiga-ui/kit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DataPanelComponent, TickInfoComponent, ChildTableComponent],
  providers: [
    TickInfoWebsocketService,
    {
      provide: TICK_DATA_CALCULATION_TOKEN,
      useFactory: tickDataFactory,
    },
  ],
  imports: [
    CommonModule,
    TuiTableModule,
    TuiInputNumberModule,
    ReactiveFormsModule,
    FormsModule,
    TuiInputTagModule,
  ],
  exports: [DataPanelComponent],
})
export class DataPanelModule {}

function tickDataFactory(): ITickDataCalculation {
  if (typeof Worker !== undefined) return new TickDataWebWorkerService();
  return new TickDataFallbackService();
}
