import { combineEpics, Epic } from 'redux-observable';
import { filter, tap, mergeMap } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';

import { RootAction, RootState } from '../reducer';
import * as workloadsActions from './actions';
import { WorkloadService } from './services';


type AppEpic = Epic<RootAction, RootAction, RootState>;
const workloadService = new WorkloadService();

const logWorkloadSubmissions: AppEpic = (action$, state$) => (
  action$.pipe(
    filter(isActionOf(workloadsActions.submit)),
    tap((payload) => console.log('Workload submitted', payload)),
    mergeMap(async (action) => {
      const createdTask = await workloadService.create(action.payload);
      console.log(createdTask);
      createdTask.createdDate = new Date();
      return workloadsActions.created(createdTask);
    })
  )
);

const cancelWorkload: AppEpic = (action$, state$) => (
  action$.pipe(
    filter(isActionOf(workloadsActions.cancel)),
    tap((payload) => console.log('Workload cancelled', payload)),
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
