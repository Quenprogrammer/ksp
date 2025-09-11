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
