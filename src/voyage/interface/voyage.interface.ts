import { User } from "../../user/interface/user.interface";
import { Location } from "../../voyage/interface/location.interface";
import { Widget } from "../../widget/interface/widget.interface";

export interface Voyage {
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
}