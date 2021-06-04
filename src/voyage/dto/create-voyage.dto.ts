import { Location } from '../interface/location.interface';

export type CreateVoyageDto = {
  name: string;
  defaultName: string;
  startDate: Date;
  endDate: Date;
  cityName: string;
  location: Location;
}