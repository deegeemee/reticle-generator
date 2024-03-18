export type ReticleType = {
  size: number;
  axis: AxisType[];
  circles: CircleType[];
};

export type AxisMarkerType = {
  enabled: boolean;
  count: number;
  gap: number;
  offset: number;
  length: number;
  strokeWidth: number;
};

export type AxisType = {
  enabled: boolean;
  angle: number;
  strokeWidth: number;
  offsetStart: number;
  offsetEnd: number;
  markers: AxisMarkerType[];
};

export type CircleType = {
  enabled: boolean;
  radius: number;
  strokeWidth: number;
};
