<template>
  <div>
    <v-select v-model="selectedTask" :items="part.tasks" item-text="taskDescription" label="Select a task"
      @change="selectTask" />
    <div v-if="selectedTask">
      <h2>{{ selectedTask.taskDescription }}</h2>
      <div v-for="(subtask, index) in selectedTask.subtasks" :key="index">
        <h3>{{ subtask.subtaskDescription }}</h3>
        <v-img :src="subtask.subtaskImageUrl" max-width="300px" class="mx-auto" />
        <div v-for="(defect, i) in subtask.subtaskDefects" :key="i">
          <h4>{{ defect.defectDescription }}</h4>
          <p>{{ defect.defectTypes.join(', ') }}</p>
          <p>Maximum serviceable limit: {{ defect.limits.maximumServiceableLimit }}</p>
          <p>Maximum repairable limit: {{ defect.limits.maximumRepairableLimit }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  props: ['part'],
  data() {
    return {
      selectedTask: null,
    };
  },
  methods: {
    selectTask() {
      // Add any behavior needed when a new task is selected.
    },
  },
};
</script>
  
<style scoped>
h2 {
  margin-top: 1em;
}

h3 {
  margin-top: 1em;
}

h4 {
  margin-top: 1em;
}
</style>
  