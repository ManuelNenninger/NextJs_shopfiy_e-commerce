import { ApiHooks } from "./hooks";

export type ApiFetcherOptions = {
  query: string;
  variables?: Variables;
};

export type ApiFetcherResults<T> = {
  data: T;
};

export type ApiFetcher<T = any> = (
  options: ApiFetcherOptions
) => Promise<ApiFetcherResults<T>>;

// Variables ist ein Object mit dem value als String
export type Variables = { [key: string]: string | any | undefined };

export interface ApiConfig {
  fetch<T>(options: ApiFetcherOptions): Promise<ApiFetcherResults<T>>;
  checkoutCookie: string;
}

export interface ApiProviderContext {
  hooks: ApiHooks;
  fetcher: ApiFetcher;
  checkoutCookie: string;
}
