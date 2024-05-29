import { ChildData } from '../interfaces';

export const mapInitialStatuses = (children: ChildData[]): { [childId: string]: boolean } => {
  return children.reduce((statuses, child) => {
    statuses[child.childId] = child.checkedIn;
    console.log(child)
    return statuses;
  }, {} as { [childId: string]: boolean });
};