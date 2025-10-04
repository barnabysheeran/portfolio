const FillStrategyType = {
    PassThrough: 0,
    Reverse: 1,
    Random: 2,
} as const;

type FillStrategyTypeValue = typeof FillStrategyType[keyof typeof FillStrategyType];

export default FillStrategyType;
export type { FillStrategyTypeValue };
