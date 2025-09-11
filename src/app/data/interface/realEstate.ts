export enum PROPERTY_TYPE {
  RENT = "FOR_RENT",
  SALE = "FOR_SALE",
  DAILY_RENT = "FOR_DAILY",
  UNKNOWN = "UNKNOWN"
}
export interface PropertyModelBase {

  propertyId: string,
  propertyName: string,
  listingType:  PROPERTY_TYPE,//For rent, For Sale, For Holiday renting
  price: number,
  setPriceCallToAsk?: boolean,
  isAvailable?: boolean,
  currency: string,
  isPublished?: boolean,
  description: string,
  location: string,
  translations?: {
    //deDE,ruRU,trTR
    [key: string]: {
      propertyName?: string,
      description?: string,
    }
  }
  locationDetail?: {
    city?: string;
    district?: string;
    showExactLocation?: string;
    showApproximateLocation?: string;
    lat?: string;
    lng?: string;
  }
  propertyImage: string,
  imageUrls: string[],
  floorPlans?: string[],
  breadCrumb: string[],
  agent: {
    agentId: string,
    agentName: string,
    agentImageUrl: string,
    agentPhoneNumbers: string
  } | null,

  map: {
    maptype: string,
    language: string,
    q: string,
    zoom: number,
    key: string
  } | null,

  video: { videoSrc: string, videoThumbnail?: string } | null

  specification: {
    title: string,
    value: string
  }[],

  propertyInformation?: {
    propertyType: string,//
    rooms: string,//
    baths: string,//
    area: string//
    plotSize?: string;
    bedrooms?: string,
    titleDeeds?: string,
    buildingAge?: string,
    floor?: string,
    noOfFloorsInBuilding?: string,
    insideHousingSite?: string,
    furniture?: string,
    pool?: string,
    swap?: string,

  },

  features: {
    title: string,
    features: string[]
  }[],
  dropShippingData: {
    propertyUrl: string,
    data: any
  }
  estimatedRunningCost?: {
    mortgage?: number,
    energy?: number,
    water?: number,
    homeInsurance?: number,
  },
  accessibility?: {
    location?: number,
    areaSafety?: number,
    closeToSchools?: number,
    lowCost?: number,
    builtAround?: number,
    value?: number
  }


}
