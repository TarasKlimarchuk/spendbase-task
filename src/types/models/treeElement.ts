import { AccessProhibitions, ID } from '../index.ts';
export interface TreeElement {
  id: ID;
  parent: ID;
  text: string;
  droppable?: boolean;
  data?: { accessProhibitions: AccessProhibitions[] };
}
