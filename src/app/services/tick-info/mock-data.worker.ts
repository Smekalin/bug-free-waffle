import { Config } from '../../interfaces/tick-info.interface';
import { generateTickInfoList } from './mock-data';

addEventListener('message', ({ data }: MessageEvent<Config['size']>) => {
  const mock = generateTickInfoList(data);

  postMessage(JSON.stringify(mock));
});
