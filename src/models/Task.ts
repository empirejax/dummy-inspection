import { Subtask } from './Subtask';

export class Task {
  constructor(
    public taskAta: any, 
    public taskDescription: any, 
    public subtasks: Subtask[] = []
  ) {}
}