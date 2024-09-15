export interface FetchTypeInterface {
  fetchData(urls: string[]): Promise<any[]>;
}
