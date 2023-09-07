export enum BeersViewTab {
  ALL_BEERS = "ALL_BEERS",
  MY_BEERS = "MY_BEERS",
}

export interface Beer {
  id?: number;
  name: string;
  tagline: string;
  first_brewed?: string;
  description: string;
  image_url?: string;
  ingredients?: {
    malt: Array<Partial<{
      name: string;
      amount: {
        value: number;
        unit: string;
      };
    }>>;
    hops: Array<Partial<{
      name: string;
      amount: {
        value: number;
        unit: string;
      };
      add: string;
      attribute: string;
    }>>;
    yeast: string;
  };
  food_pairing?: Array<string>;
  brewers_tips?: string;
  contributed_by?: string;
  [key: string]: any;
}
