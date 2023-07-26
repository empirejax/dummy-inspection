export class Limit {
  constructor(maximumServiceableLimit, maximumRepairableLimit) {
    this.maximumServiceableLimit = maximumServiceableLimit || [];
    this.maximumRepairableLimit = maximumRepairableLimit || [];
  }
}
  
import { Limit } from './Limit.js';

export class Defect {
  constructor(defectAta, defectTypes, defectDescription, limits) {
    this.defectAta = defectAta;
    this.defectTypes = defectTypes || [];
    this.defectDescription = defectDescription;
    this.limits = limits ? new Limit(limits.maximumServiceableLimit, limits.maximumRepairableLimit) : new Limit();
  }
}

  
import { Defect } from './Defect.js';

export class Subtask {
  constructor(subtaskAta, subtaskDescription, subtaskImageUrl, subtaskDefects) {
    this.subtaskAta = subtaskAta;
    this.subtaskDescription = subtaskDescription;
    this.subtaskImageUrl = subtaskImageUrl;
    this.subtaskDefects = subtaskDefects ? subtaskDefects.map(defect => new Defect(defect.defectAta, defect.defectTypes, defect.defectDescription, defect.limits)) : [];
  }
}

  
import { Subtask } from './Subtask.js';

export class Task {
  constructor(taskAta, taskDescription, subtasks) {
    this.taskAta = taskAta;
    this.taskDescription = taskDescription;
    this.subtasks = subtasks ? subtasks.map(subtask => new Subtask(subtask.subtaskAta, subtask.subtaskDescription, subtask.subtaskImageUrl, subtask.subtaskDefects)) : [];
  }
}

  
import { Task } from './Task.js';

export class Part {
  constructor(esm, partName, tasks) {
    this.esm = esm;
    this.partName = partName;
    this.tasks = tasks ? tasks.map(task => new Task(task.taskAta, task.taskDescription, task.subtasks)) : [];
  }
}
  
import { Part } from './Part.js';

export class Section {
    constructor(name, ATA, engineParts) {
      this.name = name;
      this.ATA = ATA;
      this.engineParts = engineParts 
        ? engineParts.map(part => new Part(part.esm, part.partName, part.tasks))
        : [];
    }
}

  
import { Section } from './Section.js';

export class Engine {
    constructor(engineLine, engineSections) {
      this.engineLine = engineLine;
      this.engineSections = engineSections 
        ? engineSections.map(section => new Section(section.name, section.ATA, section.engineParts)) 
        : [];
    }
}