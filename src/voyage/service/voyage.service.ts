import AsyncStorage from "@react-native-community/async-storage";
import { useLinkProps } from "@react-navigation/native";
import { ApiService } from "../../common/services/api.service";
import { CreateVoyageDto } from "../dto/create-voyage.dto";
import { Voyage } from "../interface/voyage.interface";

export class VoyageService {
  private static instance: VoyageService;

  private apiService: ApiService;

  constructor() {
    this.apiService = ApiService.getInstance();
  }

  public static getInstance(): VoyageService {
    if (!VoyageService.instance) {
      VoyageService.instance = new VoyageService();
    }

    return VoyageService.instance;
  }

  public async createVoyage(voyage: CreateVoyageDto): Promise<Voyage> {
    const token = await AsyncStorage.getItem('token');
    
    return this.apiService.request<Voyage>('post', '/voyages', { headers: { 'Authorization': `${token}` } ,body: voyage });
  }

}