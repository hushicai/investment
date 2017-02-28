/**
 * @file actions
 * @author hushicai(bluthcy@gmail.com)
 */

export const ON_VALUTION_PARAM_INPUT = 'ON_VALUTION_PARAM_INPUT';

export function updateValutionParam(valution) {
  return {
    type: ON_VALUTION_PARAM_INPUT,
    valution: valution
  };
}
