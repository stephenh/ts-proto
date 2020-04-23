import { Any } from './google/protobuf/any';


export interface Registration {
  eventName: string;
  date: Date | undefined;
  perks: Any | undefined;
}
