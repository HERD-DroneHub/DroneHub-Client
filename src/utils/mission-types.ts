export const MissionTypes = {
  PERIMETER_SEARCH: 'Perimeter Search',
  OPTIMAL_SEARCH: 'Optimal Search',
  GO_TO: 'Go to Location',
} as const;

export const MissionConfig = {
  DEFAULT: 'default',
  CREATE: 'create',
} as const;

export type MissionType = typeof MissionTypes[keyof typeof MissionTypes];
export type MissionConfigType = typeof MissionConfig[keyof typeof MissionConfig];