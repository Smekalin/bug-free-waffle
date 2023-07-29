import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TickInfo } from '../../../../models/tick-info/tick-info';

@Component({
  selector: 'app-tick-info',
  templateUrl: './tick-info.component.html',
  styleUrls: ['./tick-info.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TickInfoComponent {
  @Input()
  tickInfoList: TickInfo[] = [];

  get columns(): string[] {
    if (!this.tickInfoList.length) {
      return [];
    }

    return Object.keys(this.tickInfoList[0]);
  }
}
