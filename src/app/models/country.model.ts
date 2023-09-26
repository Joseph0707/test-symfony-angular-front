import { Former } from "./former.model";

export interface  Country {
  id: number;
  groupName: string;
  city: string;
  country: string;
  beginningYears: number;
  endingYears?: number;
  founders?: Array<Partial<Former>>;
  members?: number;
  musicType: {
    type: null | string
  };
  description: string;
}
