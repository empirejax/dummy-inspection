import { Task } from './Task';

export class Part {
  constructor(
    public esm: any,
    public partName: any,
    public tasks: Task[] = []
  ) { }
}