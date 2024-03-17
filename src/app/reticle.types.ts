export type ReticleType = {
  size: number;
  axis: AxisType[];
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
