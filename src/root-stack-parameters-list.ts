import { MarkerType } from "./screens/map.screen";

export type RootStackParamList = {
  // global
  Auth: undefined;
  Home: undefined;
  Map: undefined;
  MarkerDetail: { marker: MarkerType }
}