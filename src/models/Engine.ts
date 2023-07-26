import { Section } from './Section';

export class Engine {
  constructor(
    public engineLine: any,
    public engineSections: Section[] = []
  ) { }
}
