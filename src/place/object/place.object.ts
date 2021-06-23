import { makeAutoObservable } from "mobx";
import { Location } from "../../voyage/interface/location.interface";
import { PlaceTypeInterface } from "../interface/place-type.interface";
import { Place } from "../interface/place.interface";

export class PlaceObject implements Place {

  _id: string;

  type: PlaceTypeInterface;

  typeId: string;

  position: Location;

  name: string;

  isGlobal?: boolean;

  constructor (place: Place) {
    this._id = place._id;
    this.type = place.type;
    this.name = place.name;
    this.position = place.position;
    this.typeId = place.typeId;
    this.isGlobal = place.isGlobal;

    makeAutoObservable(this);
  }

  /**
   * Transform a mobx object into a classic object
   * @returns {Place} place 
   */
  public toJS(): Place {
    return {
      _id: this._id,
      type: this.type,
      name: this.name,
      position: this.position,
      typeId: this.typeId,
      isGlobal: this.isGlobal,
    };
  }
}