/* eslint-disable @typescript-eslint/no-explicit-any */
import { queries } from './lib/queries';
import { ProviderTypes } from './types/types';

export class GraphProviderWrapper {
  type = ProviderTypes.GRAPH_QL;
  provider: any;

  constructor(provider: any) {
    this.provider = provider;
  }
  async getOwner(): Promise<string> {
    throw new Error(
      "We're sorry, getOwner() method not yet supported in graph provider type."
    );
  }

  async getData(address: string, keyOrKeys: string | string[]) {
    if (!keyOrKeys || Array.isArray(keyOrKeys)) {
      // TODO: support array of keys
      throw new Error(`Incorrect parameter 'keys' in getData() ${keyOrKeys}`);
    }
    // Get the value for the specific single key
    const query = queries.getDataByKey(address, keyOrKeys);
    const result = await this.provider.query({ query });
    // Single out the first result as expected
    const ret =
      result.data[Object.keys(result.data)[0]][0] &&
      result.data[Object.keys(result.data)[0]][0].value;
    return !ret ? null : ret;
  }

  async getAllData(address: string) {
    const query = queries.getAllData(address);
    const result = await this.provider.query({ query });
    // Return the data query array
    return result.data[Object.keys(result.data)[0]];
  }
}
