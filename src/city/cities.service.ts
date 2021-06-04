import { ApiService } from "../common/services/api.service";
import { CityResponse } from "./interface/city-response.interface";
import { City } from "./interface/city.interface";

export class CitiesService {
  private static instance: CitiesService;

  private apiService: ApiService;

  constructor() {
    this.apiService = ApiService.getInstance();
  }

  public static getInstance(): CitiesService {
    if (!CitiesService.instance) {
      CitiesService.instance = new CitiesService();
    }

    return CitiesService.instance;
  }

  async getCity(q: string): Promise<City | undefined> {
   try {
    const response = (await this.apiService.request<CityResponse[]>('get', `http://api.openweathermap.org/geo/1.0/direct?q=${q}&limit=1&appid=${process.env.CITIES_API_KEY}`, { isRequestingAPI: false }))[0];
    return { 
      country: response.country, 
      name: response.name,
      position: {
        longitude: response.long,
        latitude: response.lat,
      }
    };
   } catch (err) {
    return undefined;
   }
  }

}