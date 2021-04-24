import { combineEpics, Epic } from 'redux-observable';
import { filter, mergeMap } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';

import { RootAction, RootState } from '../reducer';
import * as workloadsActions from './actions';
import { WorkloadService } from './services';


type AppEpic = Epic<RootAction, RootAction, RootState>;
const workloadService = new WorkloadService

const logWorkloadSubmissions: AppEpic = (action$, state$) => (
  action$.pipe(
    filter(isActionOf(workloadsActions.submit)),
    mergeMap(async (action) => {
      console.log(action.payload);
      const createdTask = await workloadService.create(action.payload);
      return workloadsActions.created(createdTask);
    })
  )
);

const cancelWorkload: AppEpic = (action$, state$) => (
  action$.pipe(
    filter(isActionOf(workloadsActions.cancel)),
    mergeMap(async (action) => {
      const work = await workloadService.cancel(action.payload);
      return workloadsActions.updateStatus(work);
    })
  )
);

export const epics = combineEpics(
  logWorkloadSubmissions,
  cancelWorkload
);

export default epics;
