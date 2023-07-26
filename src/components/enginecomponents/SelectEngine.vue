<template>
  <div>
    <v-list>
        <v-list-item>
          <v-list-item-title>Engine:</v-list-item-title>
          <v-select v-model="selectedEngine" :items="engineOptions" outlined></v-select>
        </v-list-item>
  
        <v-list-item v-if="selectedEngine">
          <v-list-item-title>Section:</v-list-item-title>
          <v-select v-model="selectedSection" :items="sectionOptions" item-text="name" item-value="name" outlined></v-select>
        </v-list-item>
  
        <v-list-item v-if="selectedSection">
          <v-list-item-title>ESM:</v-list-item-title>
          <v-select v-model="selectedTask" :items="taskOptions" item-text="taskDescription" item-value="taskAta" outlined></v-select>
        </v-list-item>
      </v-list>
  </div>
  </template>
  

<script>
import { ref, computed, watch } from 'vue';
export default {
  props: {
    engines: {
      type: Array,
      required: true,
    },
  },
  setup(props) {

    const selectedEngine = ref('');
    const selectedSection = ref('');
    const selectedTask = ref('');

    const engineOptions = computed(() => {
      return props.engines.map(engine => engine.engineLine);
    });

    const sectionOptions = computed(() => {
  const selectedEngineValue = selectedEngine.value;
  const selectedEngineData = props.engines.find(engine => engine.engineLine === selectedEngineValue);
  if (selectedEngineData) {  // add this check
    const sections = selectedEngineData.engineSections.map(section => section.name);
    return [].concat(...sections);
  }
  return [];
});

const taskOptions = computed(() => {
  const selectedEngineValue = selectedEngine.value;
  const selectedSectionValue = selectedSection.value;
  const selectedEngineData = props.engines.find(engine => engine.engineLine === selectedEngineValue);
  if (selectedEngineData) {  // add this check
    const selectedSectionData = selectedEngineData.engineSections.find(section => section.name === selectedSectionValue);
    if (selectedSectionData && selectedSectionData.engineParts.length > 0) {
      const tasks = selectedSectionData.engineParts.map(part => part.partName);
      return [].concat(...tasks);
    }
  }
  return [];
    });

    // Reset selected section and task when the selected engine changes
    watch(selectedEngine, () => {
      selectedSection.value = '';
      selectedTask.value = '';
    });

    // Reset selected task when the selected section changes
    watch(selectedSection, () => {
      selectedTask.value = '';
    });

    return {
      selectedEngine,
      selectedSection,
      selectedTask,
      engineOptions,
      sectionOptions,
      taskOptions,
    };
  },
};
</script>
