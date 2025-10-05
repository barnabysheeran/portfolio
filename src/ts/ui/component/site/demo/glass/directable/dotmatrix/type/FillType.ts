const FillType = {
  PassThrough: 0,
  Random: 1,
} as const;

type FillTypeValue = (typeof FillType)[keyof typeof FillType];

export default FillType;
export type { FillTypeValue };
