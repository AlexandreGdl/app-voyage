import { WidgetType } from "../../screens/widgets.screen";

export interface Widget {
  name: WidgetType;
  _id: string;
  description: string
}