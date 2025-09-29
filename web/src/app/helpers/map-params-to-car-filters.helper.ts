import { Params } from '@angular/router';
import { SearchCarsFilters } from '../types/car.type';
import { normalizeToArray } from './normalize-to-array.helper';

export const mapParamsToCarFilters = (
  params: Params,
): Partial<SearchCarsFilters> => {
  return {
    name: params['name'] ?? '',
    type: normalizeToArray(params['type']),
    engine: normalizeToArray(params['engine']).map(Number),
    size: normalizeToArray(params['size']).map(Number),
  };
};
