import { createAction } from 'typesafe-actions';

import { Status } from './types';
import { SUBMIT, CREATED, CANCEL, UPDATE_STATUS, CHECK_STATUS } from './constants';


export const submit = createAction(SUBMIT, resolve => (params: { complexity: number, name: string }) => resolve({ complexity: params.complexity, name: params.name }));

export const created = createAction(CREATED, resolve =>
  (params: { id: number, name: string, status: Status, complexity: number, createdDate: Date, completeDate: Date }) => resolve({
    id: params.id,
    name: params.name,
    status: params.status,
    createdDate: params.createdDate,
    completeDate: params.completeDate,
    complexity: params.complexity,
  }));

export const cancel = createAction(CANCEL, resolve => (params: { id: number }) => resolve({ id: params.id }));

export const updateStatus = createAction(UPDATE_STATUS, resolve =>
  (params: { id: number, status: Status }) => resolve({ id: params.id, status: params.status }));

export const checkStatus = createAction(CHECK_STATUS, resolve => 
  (params: { id: number, status: Status }) => resolve({ id: params.id, status: params.status }));