export type ReticleType = {
  size: number;
  axis: AxisType[];
  circles: CircleType[];
};

export type AxisMarkerType = {
  enabled: boolean;
  maxCount: number;
  gap: number;
  offset: number;
  length: number;
  strokeWidth: number;
  numbered: boolean;
  color: string;
};

export type AxisType = {
  enabled: boolean;
  angle: number;
  strokeWidth: number;
  offsetStart: number;
  offsetEnd: number;
  markers: AxisMarkerType[];
  color: string;
};

export type CircleType = {
  enabled: boolean;
  radius: number;
  strokeWidth: number;
  color: string;
};
