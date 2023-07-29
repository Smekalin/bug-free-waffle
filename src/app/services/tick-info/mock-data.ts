import { Config } from '../../interfaces/tick-info.interface';
import { ITickInfo } from '../../models/tick-info/tick-info.interface';

export function generateTickInfoList(size: Config['size']): ITickInfo[] {
  const data: ITickInfo[] = [];
  for (let i = 0; i < size; i++) {
    data.push({
      int: getRandomRange(0, size),
      float: '1231231123123123123',
      color: getColor(),
      id: String(i),
      child: { id: String(i) + getRandomRange(i, i + 1000), color: getColor() },
    });
  }
  return data;
}

function getRandomRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

const colors: Record<string, string> = {
  0: 'red',
  1: 'rgb(0,255,0)',
  2: '#0000ff',
};

function getColor(): string {
  return colors[getRandomRange(0, 3)];
}
