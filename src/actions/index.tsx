import * as constants from '../constants';

export interface IncrementEnthusiam{
   type: constants.INCREMENT_ENTHUSIASM; 
}

export interface DecrementEnthusiam{
    type: constants.DECREMENT_ENTHUSIASM;
}

export type EnthusiamAction = IncrementEnthusiam | DecrementEnthusiam;


export function  incrementEnthusiam(): IncrementEnthusiam{
     return {
         type: constants.INCREMENT_ENTHUSIASM
     }
}
export function decrementEnthusiam(): DecrementEnthusiam{
    return {
        type: constants.DECREMENT_ENTHUSIASM
    }
}
