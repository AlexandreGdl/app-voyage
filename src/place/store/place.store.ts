import { makeAutoObservable, runInAction } from 'mobx';
import { PlaceService } from '../service/place.service';
import { PlaceObject } from '../object/place.object';
import { Place } from '../interface/place.interface';

export class PlaceStore {

  public globalPlaces: Array<PlaceObject> = [];

  public placeService: PlaceService;

  public isLoading = false;

  constructor() {
    this.placeService = PlaceService.getInstance();
    makeAutoObservable(this, { placeService: false });
  }

  /**
   * Fetch all the global Places
   * @returns {Promise<void>} update the store
   */
  public async fetchGlobalPlaces(): Promise<void> {
    runInAction(() => { this.isLoading = true; });

    const places = await this.placeService.getPlaces();
    const globalPlaces = places.map((place: Place) => new PlaceObject(place));

    runInAction(() => {
      this.globalPlaces = globalPlaces;
      this.isLoading = false;
    });
  }
}
