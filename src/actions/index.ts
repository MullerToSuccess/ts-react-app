import * as constants from '../constants/index';

export interface IncrementEnthusiam{
   type: constants.INCREMENT_ENTHUSIASM; 
}

export interface DecrementEnthusiam{
    type: constants.DECREMENT_ENTHUSIASM;
}

export type EnthusiamAction = IncrementEnthusiam | DecrementEnthusiam;

export interface ChangeItem{
    type: constants.CHANGE_ITEM;
    text: string;
}

export interface GetTable{
    type: constants.GET_TABLE;
    data: any
}

export interface ToggleVisible{
    type: constants.TOGGLE_VISIBLE,
    data: any
}

export interface GetColumn{
    type: constants.GET_COLUMN,
    data: any
}
/**
 *
 *纯action返回action的string类型的type
 * @export
 * @returns {IncrementEnthusiam}
 */
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

/**
 *change_item的action
 *
 * @export
 * @returns {ChangeItem}
 */
export function changeAction(): ChangeItem{
    return {
        type: constants.CHANGE_ITEM,
        text: ''
    }
}

/**
 *get_table的action
 *
 * @export
 * @returns {GetTable}
 */
export function getTable(data: any): GetTable{
    return {
        type: constants.GET_TABLE,
        data: data
    }
}

export function toggleVisible(data: any): ToggleVisible{
    return {
        type: constants.TOGGLE_VISIBLE,
        data: data
    }
}
/* 获取column参数 */
export function getColumn(data: any): GetColumn{
    return {
        type: constants.GET_COLUMN,
        data: data
    }
}
