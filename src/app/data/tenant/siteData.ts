import {Timestamp} from '@angular/fire/firestore';

export interface socialAccountInterface {
  imgURL:string;
  name:string;
  link:string;

}
export interface contactDetailsInterface {
  imgURL:string;
  name:string;
  link:string;

}




export interface Course {
  courseId: string;
  courseTitle: string;
  courseCategory: string;
  courseShortDescription: string;
  courseFullDescription: string;
  duration: string;
  language: string;
  price: string;
  currency: string;
  courseLevel: string;
  targetAudience:string;
  accessType:string;
  learningObjectives:string;
  subscriptionOptions:string;
  certification:string;
  courseFeaturedImage?: string;
  listWhatYouWillLearn: string[];
  courseFeatures: string[];
  coursePreviewVideo: {
    videoSrc: string;
    videoThumbnail: string;
  } | null;
  totalVideoHours: number;
  numberOfArticles: number;
  numberOfDownloadableResources: number;
  hasCertificateOnCompletion: boolean;
  courseInstructor: {
    id: string;
    name: string;
    imageUrl: string;
  };
  isPublished: boolean;
  courseModule: {  // Changed from 'lectures' to 'courseModule'
    moduleName: string;  // Module name (e.g., "Python", "Java")
    lectures: {
      Title: string;
      Description: string;
      FileUrl: string;
      FileType: string;
    }[]; // Array of lectures for this module
  }[]; // Array of course modules

}



export interface NewsArticlePoster {
  id: string;
  name: string;
  imageUrl: string;
  phoneNumber?: string;
  position?: string;
}
export interface NewsPressArticle {
  newsArticleId: string;
  newsArticleTitle: string;
  newsArticleShortDescription: string;
  newsArticleFeaturedImage: string;
  newsArticlePoster: NewsArticlePoster[];
  newsArticleDescription: string;
  newArticlesTags: string[];
  translations?: {
    //deDE,ruRU,trTR
    [key: string]: {
      newsArticleTitle?: string;
      newsArticleShortDescription?: string;
      newsArticleDescription?: string;
    }
  }
  isPublished?: boolean;
  createdOn: Timestamp;
  updated: Timestamp;

}



export interface JobPost {
  jobId: string;
  jobTitle: string;
  jobLocation: string;
  jobDepartment: string;
  jobDescription: string;
  translations?: {
    //deDE,ruRU,trTR
    [key: string]: {
      jobTitle?: string;
      jobDepartment?: string;
      jobDescription?: string;
    }
  }
  isPublished?: boolean;
  createdOn: Timestamp;
  updated: Timestamp;

}
export interface PropertyModelBase {

  propertyId: string,
  propertyName: string,
  listingType: string,//For rent, For Sale, For Holiday renting
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

  propertyInformation: {
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
  createdOn: Timestamp;
  updatedOn: Timestamp;
  updated?: Timestamp;

}
