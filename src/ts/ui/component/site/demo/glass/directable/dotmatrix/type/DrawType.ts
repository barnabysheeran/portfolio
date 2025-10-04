const DrawType = {
    Fill: 1,
    Clear: 0,
} as const;

type DrawTypeValue = typeof DrawType[keyof typeof DrawType];

export default DrawType;
export type { DrawTypeValue };
