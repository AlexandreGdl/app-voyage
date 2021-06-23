import { makeAutoObservable, runInAction } from 'mobx';
import { WidgetType } from '../../screens/widgets.screen';
import { Widget } from '../interface/widget.interface';
import { WidgetObject } from '../object/widget.object';
import { WidgetService } from '../service/widget.service';

export class WidgetStore {

  public widgets: Array<WidgetObject> = [];

  public widgetService: WidgetService;

  public isLoading = false;

  constructor() {
    this.widgetService = WidgetService.getInstance();
    makeAutoObservable(this, { widgetService: false });
  }

  /**
   * Fetch all the global Places
   * @returns {Promise<void>} update the store
   */
  public async fetchWidgets(): Promise<void> {
    runInAction(() => { this.isLoading = true; });

    const widgets = await this.widgetService.getWidgets();
    const widgetsObject = widgets.map((place: Widget) => new WidgetObject(place));

    runInAction(() => {
      this.widgets = widgetsObject;
      this.isLoading = false;
    });
  }
}
