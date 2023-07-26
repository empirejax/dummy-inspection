<template>
  <div v-if="!mixinState.mSelectMode">
    <Divider orientation="center">{{ $t('sheet_colors') }}</Divider>
    <div class="color-list">
      <ColorPicker v-model="color" @on-change="setThisColor" alpha size="default" transfer />
      <template v-for="(item, i) in colorList" :key="item.label + i">
        <div class="color-row">
          <span
            v-for="color in item.color"
            :key="color"
            :style="`background:${color}`"
            @click="setColor(color)"
          ></span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup name="BgBar">
import { ref } from 'vue';
import useSelect from '@/hooks/select';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { canvas, mixinState, canvasEditor } = useSelect();

const colorList = [
  {
    label: t('doc_colors', { number: 1 }),
    color: ['#00003d', '#d3d3d3', '#eaeaea'],
  },
];

const color = ref('');
// Background color settings
const setThisColor = () => {
  setColor(color.value);
};
// Background color settings
function setColor(color) {
  const workspace = canvasEditor.canvas.getObjects().find((item) => item.id === 'workspace');
  workspace.set('fill', color);
  canvasEditor.canvas.renderAll();
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
:deep(.ivu-form-item) {
  margin-bottom: 0;
}
.color-list {
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  .item {
    display: flex; /* Add this line */
    align-items: center; /* Add this line */
    padding-bottom: 5px;
    margin-left: 27.5px;
  }
  span {
    display: inline-block;
    margin-top: 10px;
    margin-left: 6px;
    background: #f5f5f5;
    height: 20px;
    width: 20px;
    font-size: 12px;
    line-height: 20px;
    vertical-align: middle;
    cursor: pointer;
  }
}
.color-row {
  display: flex;
  justify-content: center;
  width: 100%;
}
.img {
  width: 50px;
  padding: 5px;
  background: #f5f5f5;
  margin-left: 2px;
  height: 70px;
  cursor: pointer;
}

:deep(.ivu-divider-plain) {
  &.ivu-divider-with-text-left {
    margin: 10px 0;
    font-weight: bold;
  }
}
</style>
