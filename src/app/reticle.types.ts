export type ReticleType = {
  size: number;
  axis: AxisType[];
};

export type AxisSectionType = {
  enabled: boolean;
  count: number;
  width: number;
  offset: number;
  size: number;
};

export type AxisType = {
  enabled: boolean;
  angle: number;
  lineWidth: number;
  offsetStart: number;
  offsetEnd: number;
  sections: AxisSectionType[];
};
