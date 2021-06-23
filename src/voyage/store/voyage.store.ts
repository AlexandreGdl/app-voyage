import { makeAutoObservable, runInAction } from 'mobx';
import { Voyage } from '../interface/voyage.interface';
import { VoyageObject } from '../object/voyage.object';
import { VoyageService } from '../service/voyage.service';

export class VoyageStore {

  public usersVoyage: Array<VoyageObject> = [];

  public voyageService: VoyageService;

  public isLoading = false;

  constructor() {
    this.voyageService = VoyageService.getInstance();
    makeAutoObservable(this, { voyageService: false });
  }

  /**
   * Fetch all voyages
   * @returns {Promise<void>} update the store
   */
  public async fetchAllVoyage(): Promise<void> {
    runInAction(() => { this.isLoading = true; });

    const voyages = await this.voyageService.getVoyages();
    const usersVoyages = voyages.map((voyage: Voyage) => new VoyageObject(voyage));

    runInAction(() => {
      this.usersVoyage = usersVoyages;
      this.isLoading = false;
    });
  }

  /**
   * Add member to voyage
   * @returns {Promise<void>} update the store
   */
   public async addMemberToVoyage(voyageId: string, username: string): Promise<void> {
    runInAction(() => { this.isLoading = true; });
    await this.voyageService.addMember(voyageId, username);
    await this.fetchAllVoyage();
  }
}
