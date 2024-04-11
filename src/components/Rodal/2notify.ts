// notify.ts
import { Dispatch } from 'react';
import { Action } from '../../State/reducer';

export const notify = (dispatch: Dispatch<Action>) => (
  data
) => {
    console.log('notify');
    dispatch({
        type: 'SET_MODAL',
        payload: {
        visible: true,
        data: data
    },
  });
};
