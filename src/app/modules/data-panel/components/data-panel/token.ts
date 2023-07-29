import { InjectionToken } from '@angular/core';
import { ITickDataCalculation } from '../../../tick-data-calculation/interfaces/tick-data-calculation.interface';

export const TICK_DATA_CALCULATION_TOKEN = new InjectionToken<ITickDataCalculation>(
  'TICK_DATA_CALCULATION_TOKEN',
);
