
export type RootStackParamList = {
  // global
  Auth: undefined;
  Home: undefined;
  Profile: undefined;
  Map: undefined;
  Voyage: { voyageId: string };
  Traveller: { voyageId: string };
  Widgets: { voyageId: string };
  Slates: { voyageId: string };
}