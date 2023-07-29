import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ChildTick } from '../../../../../models/tick-info/tick-info.interface';

@Component({
  selector: 'app-child-table',
  templateUrl: './child-table.component.html',
  styleUrls: ['./child-table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildTableComponent {
  @Input()
  tableData: ChildTick[] = [];

  get columns(): string[] {
    if (!this.tableData.length) {
      return [];
    }

    return Object.keys(this.tableData[0]);
  }
}
