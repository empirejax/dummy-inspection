<template>
  <div class="engine-list" style="max-height: 500px; overflow-y: auto">
    <v-list>
      <v-list-item v-for="(engine, i) in engines" :key="i">
        <div>{{ engine.engineLine }}</div>
        <v-list>
          <v-list-item v-for="(section, j) in engine.engineSections" :key="j">
            <div class="headline mb-1">{{ section.name }} - {{ section.ATA }}</div>
            <v-list>
              <v-list-item v-for="(part, k) in section.engineParts" :key="k">
                <div class="headline mb-1">{{ part.esm }} - {{ part.partName }}</div>
                <v-list>
                  <v-list-item v-for="(task, l) in part.tasks" :key="l">
                    <div class="headline mb-1">{{ task.taskAta }} - {{ task.taskDescription }}</div>
                    <v-list>
                      <v-list-item v-for="(subtask, m) in task.subtasks" :key="m">
                        <div class="headline mb-1">
                          {{ subtask.subtaskAta }} - {{ subtask.subtaskDescription }}
                        </div>
                        <v-list>
                          <v-list-item v-for="(defect, n) in subtask.subtaskDefects" :key="n">
                            <div class="headline mb-1">
                              {{ defect.defectAta }} -
                              {{
                                defect.defectTypes
                                  ? defect.defectTypes.join(', ')
                                  : 'No defect types'
                              }}
                            </div>
                            <v-list>
                              <v-list-item>
                                <div class="headline mb-1">
                                  {{ defect.defectDescription }}
                                </div>
                                <v-list>
                                  <v-list-item>
                                    <div class="headline mb-1">
                                      <p>Service Limit:</p>
                                      -{{
                                        defect.limits.maximumServiceableLimit
                                          ? defect.limits.maximumServiceableLimit.join(', ')
                                          : 'No serviceable limit'
                                      }}
                                    </div>
                                    <div class="headline mb-1">
                                      <p>Repair Limit:</p>
                                      -{{
                                        defect.limits.maximumRepairableLimit
                                          ? defect.limits.maximumRepairableLimit.join(', ')
                                          : 'No repairable limit'
                                      }}
                                    </div>
                                  </v-list-item>
                                </v-list>
                              </v-list-item>
                            </v-list>
                          </v-list-item>
                        </v-list>
                      </v-list-item>
                    </v-list>
                  </v-list-item>
                </v-list>
              </v-list-item>
            </v-list>
          </v-list-item>
        </v-list>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import api from '../../services/api';
import { Engine } from '../../models/Engine';

export default {
  data() {
    return {
      engines: [],
    };
  },
  async created() {
    const response = await api.get('/engines');
    this.engines = response.data.map((engineData, index) => {
      try {
        console.log(engineData); // to log the engine data
        return new Engine(engineData.engineLine, engineData.engineSections);
      } catch (error) {
        console.error(`Error creating engine at index ${index} with data`, engineData, error);
      }
    });
  },
};
</script>
