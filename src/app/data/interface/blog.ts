
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

}
