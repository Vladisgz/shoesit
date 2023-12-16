export interface simplifiedProduct {
  _id: string;
  imageUrl: string;
  price: number;
  slug: string;
  category: string;
  name: string;
  sale: string;
  percent: number;
}

export interface fullProduct {
  _id: string;
  images: any;
  price: number;
  slug: string;
  category: string;
  name: string;
  description: string;
  price_id: string;
  sale: string;
  rating: number;
  reviews: number;
  percent: number;
}
