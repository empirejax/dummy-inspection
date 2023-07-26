import { Part } from './Part';

export class Section {
  constructor(
    public name: any,
    public ATA: any,
    public engineParts: Part[] = []
  ) { }
}