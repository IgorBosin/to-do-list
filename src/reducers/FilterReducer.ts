import {FilterValuesType} from "../App";

export const FilterReducer = (state: FilterValuesType, action: TsarAction): FilterValuesType => {
    switch (action.type) {
        case 'CHANGE-FILTER': {
            return action.payload.value
        }
        default:
            return state
    }
}
type TsarAction = changeFilterACReturnType

type changeFilterACReturnType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (value: FilterValuesType) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {
            value
        }
    } as const
}