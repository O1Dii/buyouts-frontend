// import {EPGT_STOP_SAVING_SAMPLE, GSEQ_STOP_SAVING_SAMPLE} from "../constants";

export const itemsInitialState = {
  items: [],
}

export function itemsReducer(state, action) {
    switch (action.type) {
    //     case EPGT_STOP_SAVING_SAMPLE:
    //     case GSEQ_STOP_SAVING_SAMPLE:
    //         return {
    //             ...state,
    //             saving: false
    //         }

        default:
            return state;
    }
}