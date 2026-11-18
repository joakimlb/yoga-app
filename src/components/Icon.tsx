import Svg, { Path } from 'react-native-svg';
import { c } from '../theme';

const paths = {
  today:'M3 10l9-7 9 7v10H3z M9 20v-6h6v6',
  explore:'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0z M16 8l-2 6-6 2 2-6z',
  progress:'M4 20V12 M12 20V4 M20 20V8',
  profile:'M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z M4 21v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v2',
  fire:'M12 22c-5 0-8-3-7-8 0-2 2-4 3-5 0 3 1 4 2 4 2-3 2-7 1-11 6 3 9 8 9 12 0 5-3 8-8 8z',
  check:'M5 12l4 4L19 6', chevron:'M9 6l6 6-6 6', back:'M19 12H5m7-7-7 7 7 7',
  moon:'M20 15A9 9 0 0 1 9 4a9 9 0 1 0 11 11z',
  sun:'M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z M12 2v2m0 16v2M2 12h2m16 0h2M5 5l2 2m10 10 2 2m0-14-2 2M7 17l-2 2',
  stretch:'M14 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0z M3 8l6 3h6l6-3m-9 3v5m0 0-5 5m5-5 5 5',
  wind:'M3 8h13a2 2 0 1 0-2-2M3 12h17a2 2 0 1 1-2 2M3 16h9a2 2 0 1 1-2 2',
  layers:'M12 3l9 5-9 5-9-5z M3 12l9 5 9-5M3 16l9 5 9-5',
  search:'M16 10a6 6 0 1 1-12 0 6 6 0 0 1 12 0z M15 15l5 5',
  heart:'M12 20 4 12a5 5 0 0 1 8-6 5 5 0 0 1 8 6z',
  download:'M12 3v12m-4-4 4 4 4-4M4 16v4h16v-4',
  close:'M6 6l12 12m0-12L6 18',
  sound:'M4 9h4l5-4v14l-5-4H4z M16 9a4 4 0 0 1 0 6m2-9a8 8 0 0 1 0 12',
  mute:'M4 9h4l5-4v14l-5-4H4z M17 10l4 4m0-4-4 4',
  previous:'M6 5v14m12-13-9 6 9 6z', next:'M18 5v14M6 6l9 6-9 6z',
  play:'M8 5l12 7-12 7z', pause:'M9 5v14m6-14v14',
} as const;
export type IconName = keyof typeof paths;
export function Icon({ name, color = c.moss, size = 22, filled = false }:
  { name: IconName; color?: string; size?: number; filled?: boolean }) {
  return <Svg width={size} height={size} viewBox="0 0 24 24" accessible={false}>
    <Path d={paths[name]} stroke={color} strokeWidth={1.75} strokeLinecap="round"
      strokeLinejoin="round" fill={filled ? color : 'none'} />
  </Svg>;
}

