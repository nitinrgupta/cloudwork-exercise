import { combineEpics, Epic } from 'redux-observable';
import { of } from 'rxjs';
import { filter, tap, map, mergeMap, takeUntil, takeWhile, delay } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';

import { RootAction, RootState } from '../reducer';
import * as workloadsActions from './actions';
import { WorkloadService } from './services';


type AppEpic = Epic<RootAction, RootAction, RootState>;
const workloadService = new WorkloadService();

const workloadSubmitted: AppEpic = (action$, state$) => (
  action$.pipe(
    filter(isActionOf(workloadsActions.submit)),
    tap((payload) => console.log('Workload submitted', payload)),
    mergeMap(async (action) => {
      const createdTask = await workloadService.create(action.payload);
      console.log(createdTask);
      return workloadsActions.created(createdTask);
    })
  )
);

const workloadCancelled: AppEpic = (action$, state$) => (
  action$.pipe(
    filter(isActionOf(workloadsActions.cancel)),
    tap((payload) => console.log('Workload cancelled', payload)),
    mergeMap(async (action) => {
      const work = await workloadService.cancel(action.payload);
      console.log(work);
      return workloadsActions.updateStatus(work);
    })
  )
);

const workloadCreated: AppEpic = (action$, state$) => (
  action$.pipe(
    filter(isActionOf(workloadsActions.created)),
    map(action => action.payload),
    tap((payload) => console.log('Workload created', payload)),
    mergeMap((payload) => {
      return of(
        workloadsActions.checkStatus(payload)
      ).pipe(
        takeUntil(action$.pipe(
          filter(isActionOf(workloadsActions.cancel))
        )),
        delay(payload.complexity * 1000),
        takeWhile((value) => {
          const workload = state$.value.workloads[value.payload.id];
          console.log(workload)
          return workload.status === 'WORKING';
        })

      )
    }),
  )
);

const workloadCheckStatus: AppEpic = (action$, state$) => (
  action$.pipe(
    filter(isActionOf(workloadsActions.checkStatus)),
    map(action => action.payload),
    tap((payload) => console.log('Workload updated', payload)),
    mergeMap(async (payload) => {
      const { status } = await workloadService.checkStatus(payload);
      console.log(status)
      return workloadsActions.updateStatus({ ...payload, status })
    }),
  )
);

export const epics = combineEpics(
  workloadSubmitted,
  workloadCancelled,
  workloadCreated,
  workloadCheckStatus
);

export default epics;
