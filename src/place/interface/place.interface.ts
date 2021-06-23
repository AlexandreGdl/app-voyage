import { Location } from '../../voyage/interface/location.interface'
import { PlaceTypeInterface } from './place-type.interface';

export interface Place {
  _id: string;
  typeId: string;
  voyageId?: string;
  position: Location;
  name: string;
  mediaId?: string;
  isGlobal?: boolean
  type: PlaceTypeInterface;
}