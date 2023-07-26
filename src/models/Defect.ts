import { Limit } from './Limit';

export class Defect {
  constructor(
    public defectAta: any,
    public defectTypes: any[] = [],
    public defectDescription: any,
    public limits: Limit = new Limit()
  ) { }
}