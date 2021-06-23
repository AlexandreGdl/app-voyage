import { makeAutoObservable } from "mobx";
import { WidgetType } from "../../screens/widgets.screen";
import { Widget } from "../interface/widget.interface";

export class WidgetObject implements Widget {

  _id: string;

  name: WidgetType;

  description: string;

  constructor (place: Widget) {

    this._id = place._id;

    this.description = place.description;

    this.name = place.name;

    makeAutoObservable(this);
  }

  /**
   * Transform a mobx object into a classic object
   * @returns {Place} place 
   */
  public toJS(): Widget {
    return {
      _id: this._id,
      name: this.name,
      description: this.description
    };
  }
}