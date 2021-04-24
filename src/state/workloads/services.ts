import moment from 'moment';

import { Status } from './types';


export class WorkloadService {

  private workLoads: { [key in number]: Work } = {};
  private counter = 0;


  private getWorkload(id: number): Work | undefined {
    console.log('here');
    return this.workLoads[id];
  }

  private completeWorkload(work: Work) {
    work.status = work.id % 2
      ? 'FAILURE'
      : 'SUCCESS';
  }


  public create({ complexity, name }: { complexity: number, name: string }) {
    const id = this.counter++;
    console.log(name);
    const status: Status = 'WORKING';
    console.log("yo");
    const milliseconds = complexity * 1000;
    const completeDate = moment().add(complexity, 'second').toDate();
    const timer = setTimeout(() => this.completeWorkload(work), milliseconds);

    const work: Work = {
      id,
      name,
      complexity,
      status,
      completeDate,
      timer,
    }
    this.workLoads[id] = work;

    return Promise.resolve({ id, name, status, complexity, completeDate });
  }

  public checkStatus({ id }: { id: number }) {
    const work = this.getWorkload(id);
    if (!work) return Promise.reject('Workload not found');
    return Promise.resolve(work);
  }

  public cancel({ id }: { id: number }) {
    const work = this.getWorkload(id);
    if (!work) return Promise.reject('Workload not found');
    if (work.status !== 'WORKING') return Promise.reject('Workload cannot be canceled');

    clearTimeout(work.timer)
    work.status = 'CANCELED';

    return Promise.resolve(work);
  }
}

interface Work {
  id: number;
  name: string;
  complexity: number;
  completeDate: Date;
  status: Status;
  timer: NodeJS.Timeout;
}
