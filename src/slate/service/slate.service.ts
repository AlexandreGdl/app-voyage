import AsyncStorage from "@react-native-community/async-storage";
import { ApiService } from "../../common/services/api.service";
import { CreateSlateDto } from "../dto/create-slate.dto";


export class SlateService {
  private static instance: SlateService;

  private apiService: ApiService;

  constructor() {
    this.apiService = ApiService.getInstance();
  }

  public static getInstance(): SlateService {
    if (!SlateService.instance) {
      SlateService.instance = new SlateService();
    }

    return SlateService.instance;
  }

  public async createSlate(createSlateDto: CreateSlateDto): Promise<void> {
    const token = await AsyncStorage.getItem('token');

    try {
      return this.apiService.request<void>('post', '/slates', { headers: { 'Authorization': `${token}` }, body: createSlateDto });
    } catch (err) {
      throw err;
    }
  };

}