export interface Voyage {
    ownerId: string;
    memberIds?: string[];
    name: string;
    selectedWidgets?: string[];
    defaultName: string;
    startDate: Date;
    endDate: Date;
    cityName: string;
    location: Location
}