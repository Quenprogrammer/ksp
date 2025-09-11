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


}
