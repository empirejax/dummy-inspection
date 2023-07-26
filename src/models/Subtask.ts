import { Defect } from './Defect';

export class Subtask {
  constructor(
    public subtaskAta: any,
    public subtaskDescription: any,
    public subtaskImageUrl: any,
    public subtaskDefects: Defect[] = []
  ) { }
}