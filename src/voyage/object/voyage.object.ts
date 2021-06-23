import { makeAutoObservable } from "mobx";
import { User } from "../../user/interface/user.interface";
import { Location } from "../../voyage/interface/location.interface";
import { Widget } from "../../widget/interface/widget.interface";
import { Voyage } from "../interface/voyage.interface";

export class VoyageObject implements Voyage {

  _id: string;
  ownerId: string;
  owner: User;
  memberIds?: string[];
  members: User[];
  name: string;
  selectedWidgets?: string[];
  defaultName: string;
  createdDate: Date;
  startDate: Date;
  endDate: Date;
  cityName: string;
  location: Location;
  activeWidgets: Widget[];

  constructor (voyage: Voyage) {
    this._id = voyage._id;
    this.ownerId = voyage.ownerId;
    this.owner = voyage.owner;
    this.memberIds = voyage.memberIds;
    this.members = voyage.members;
    this.name = voyage.name;
    this.selectedWidgets = voyage.selectedWidgets;
    this.defaultName = voyage.defaultName;
    this.createdDate = voyage.createdDate;
    this.startDate = voyage.startDate;
    this.endDate = voyage.endDate;
    this.cityName = voyage.cityName;
    this.location = voyage.location;
    this.activeWidgets = voyage.activeWidgets;

    makeAutoObservable(this);
  }

  /**
   * Transform a mobx object into a classic object
   * @returns {Voyage} voyage 
   */
  public toJS(): Voyage {
    return {
      _id : this._id,
      ownerId : this.ownerId,
      owner: this.owner,
      memberIds : this.memberIds,
      members: this.members,
      name : this.name,
      selectedWidgets : this.selectedWidgets,
      defaultName : this.defaultName,
      createdDate: this.createdDate,
      startDate : this.startDate,
      endDate : this.endDate,
      cityName : this.cityName,
      location : this.location,
      activeWidgets : this.activeWidgets
    };
  }
}