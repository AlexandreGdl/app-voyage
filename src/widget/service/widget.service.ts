import AsyncStorage from "@react-native-community/async-storage";
import { ApiService } from "../../common/services/api.service";
import { Widget } from "../interface/widget.interface";

export class WidgetService {
  private static instance: WidgetService;

  private apiService: ApiService;

  constructor() {
    this.apiService = ApiService.getInstance();
  }

  public static getInstance(): WidgetService {
    if (!WidgetService.instance) {
      WidgetService.instance = new WidgetService();
    }

    return WidgetService.instance;
  }

  async getWidgets(): Promise<Widget[]> {
    const token = await AsyncStorage.getItem('token');

    return this.apiService.request<Widget[]>('get', '/widgets', { headers: { 'Authorization': `${token}` } });
  }

}