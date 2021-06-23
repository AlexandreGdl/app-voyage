import AsyncStorage from "@react-native-community/async-storage";
import { useLinkProps } from "@react-navigation/native";
import { ApiService } from "../../common/services/api.service";
import { Place } from "../interface/place.interface";

export class PlaceService {
  private static instance: PlaceService;

  private apiService: ApiService;

  constructor() {
    this.apiService = ApiService.getInstance();
  }

  public static getInstance(): PlaceService {
    if (!PlaceService.instance) {
      PlaceService.instance = new PlaceService();
    }

    return PlaceService.instance;
  }

  async getPlaces(): Promise<Place[]> {
    const token = await AsyncStorage.getItem('token');

    return this.apiService.request<Place[]>('get', '/places', { headers: { 'Authorization': `${token}` } });
  }

}