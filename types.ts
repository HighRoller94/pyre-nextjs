import Stripe from "stripe";

export interface User {
  id: string,
  name: string,
  image_path?: string,
  follower_count?: number,
  spotify_uri?: boolean
}

export interface Artist {
  id: string,
  name: string,
  type?: string,
  image_path?: string,
  follower_count?: number,
  genres?: string[],
  spotify_url: boolean,
  spotify_uri?: string
  href?: string
}

export interface Song {
  id: string;
  user_id: string;
  author: string;
  author_id?: string;
  album_id: string;
  album_name?: string;
  title: string;
  song_path: string;
  image_path?: string;
  spotify_url: boolean;
  spotify_uri?: string
  duration: number;
  artists?: Artist[]
  likeStatus?: boolean;
  inPlaylist?: boolean;
}

export interface Album {
  id: string,
  name: string,
  songs?: Song[],
  track_count: number,
  image_path: string,
  release_date: string,
  artists?: Artist[],
  genres?: string[],
  spotify_url?: boolean,
  spotify_uri?: string
}

export interface Playlist {
  id: string,
  name: string,
  desc?: string,
  owner_name: string,
  owner_id: string,
  image_path?: string,
  public: boolean,
  track_count?: number,
  tracks?: Song[],
  spotify_url?: boolean,
  spotify_uri?: string
}

export interface Product {
  id: string;
  active?: boolean;
  name?: string;
  description?: string;
  image?: string;
  metadata?: Stripe.Metadata;
}

export interface Price {
  id: string;
  product_id?: string;
  active?: boolean;
  description?: string;
  unit_amount?: number;
  currency?: string;
  type?: Stripe.Price.Type;
  interval?: Stripe.Price.Recurring.Interval;
  interval_count?: number;
  trial_period_days?: number | null;
  metadata?: Stripe.Metadata;
  products?: Product;
}

export interface Customer {
  id: string;
  stripe_customer_id?: string;
}

export interface UserDetails {
  id: string;
  first_name: string;
  last_name: string;
  full_name?: string;
  avatar_url?: string;
  billing_address?: Stripe.Address;
  payment_method?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type];
}

export interface ProductWithPrice extends Product {
  prices?: Price[];
}

export interface Subscription {
  id: string;
  user_id: string;
  status?: Stripe.Subscription.Status;
  metadata?: Stripe.Metadata;
  price_id?: string;
  quantity?: number;
  cancel_at_period_end?: boolean;
  created: string;
  current_period_start: string;
  current_period_end: string;
  ended_at?: string;
  cancel_at?: string;
  canceled_at?: string;
  trial_start?: string;
  trial_end?: string;
  prices?: Price;
}
