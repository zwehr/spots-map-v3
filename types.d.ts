type Spot = {
  _id: string;
  name: string;
  description: string;
  lat: number;
  lng: number;
  isPremium: boolean;
  type: string;
  status: string;
  tags: Array<string>;
  youtubeLinks: Array<string>;
  images: Array<string>;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

type NewSpot = {
  name: string;
  description: string;
  city: string;
  lat: number;
  lng: number;
  isPremium: boolean;
  type: string;
  status: string;
  tags: Array<string>;
  youtubeLinks: Array<string>;
  images: Array<string>;
  createdAt: Date;
  updatedAt: Date;
};
