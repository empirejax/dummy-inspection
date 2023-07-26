<template>
  <div class="home">
    <Layout>
      <div class="navbar">
        <img src="/ge_monogram_white.png" height="52" />
        <h1 class="navbar-title">EM 72-53-02 INSEPCTION 001 - STAGE 1 - INSPECTION</h1>
        <div class="navbar-content">
          <p></p>
          <button class="icon-button">
            <i class="material-icons">settings</i>
          </button>
        </div>
      </div>
      <Header v-if="state.show">
        <!--Introduction-->
        <import-JSON></import-JSON>
        <Divider type="vertical" />
        <Divider type="vertical" />
        <!-- Tab switch -->
        <Tooltip :content="$t('grid')">
          <iSwitch
            v-model="state.ruler"
            @on-change="rulerSwitch"
            size="small"
            class="switch"
          ></iSwitch>
        </Tooltip>
        <Divider type="vertical" />
        <history></history>

        <div style="float: right">
          <!-- Preview -->
          <import-file></import-file>
          <previewCurrent />
          <save></save>
        </div>
      </Header>
      <Content style="display: flex; height: calc(100vh - 64px)">
        <div v-if="state.show" style="width: 530px; height: 100%; background: #fff; display: flex">
          <Menu
            :active-name="state.menuActive"
            accordion
            @on-select="(activeIndex) => (state.menuActive = activeIndex)"
            width="65px"
          >
            <MenuItem :name="1" class="menu-item">
              <i class="mdi mdi-view-compact" size="24" />
              <div>{{ $t('features') }}</div>
            </MenuItem>
            <MenuItem :name="2" class="menu-item">
              <i class="mdi mdi-loupe" size="24" />
              <div>{{ $t('defects') }}</div>
            </MenuItem>
            <MenuItem :name="3" class="menu-item">
              <i class="mdi mdi-book-open-page-variant" size="24" />
              <div>{{ $t('ref_docs') }}</div>
            </MenuItem>
          </Menu>
          <div class="content">
            <!-- Generate template -->
            <div v-show="state.menuActive === 1" class="left-panel">
              <Divider plain orientation="center" style="font-weight: bold">
                {{ $t('available_features') }}
              </Divider>
              <ul class="subtask-list">
                <li
                  v-for="subtask in allSubtasks"
                  :key="subtask.subtaskAta"
                  class="subtask-item"
                  @click="loadSubtaskImage(subtask)"
                >
                  {{ subtask.subtaskDescription }}
                </li>
              </ul>
            </div>
            <!-- Subtasks -->
            <div v-show="state.menuActive === 2" class="left-panel">
              <Divider plain orientation="center" style="font-weight: bold">
                {{ $t('all_defects') }}
              </Divider>
              <ul class="defect-list">
                <li v-for="(defect, index) in getAllDefects()" :key="index" class="defect-item">
                  <div class="defect-content">
                    <h3>{{ defect.defectAta }}</h3>
                    <p>{{ defect.defectDescription }}</p>
                  </div>
                </li>
              </ul>
            </div>
            <!-- Background settings -->
            <div v-show="state.menuActive === 3" class="left-panel">
              <Divider plain orientation="center" style="font-weight: bold">
                {{ $t('ref_docs') }}
              </Divider>
              <layer></layer>
            </div>
          </div>
        </div>
        <!-- Canvas area -->
        <div id="workspace" style="width: 100%; position: relative; background: #f1f1f1">
          <div class="canvas-box">
            <div class="inside-shadow"></div>
            <canvas id="canvas" :class="state.ruler ? 'design-stage-grid' : ''"></canvas>
            <dragMode v-if="state.show"></dragMode>
            <zoom></zoom>
            <!-- <mouseMenu></mouseMenu> -->
            <!-- <EngineList></EngineList> -->
          </div>
        </div>
        <!-- Attribute area 380-->
        <div
          style="
            width: 530px;
            height: 100%;
            padding: 10px;
            margin-right: 25px;
            overflow-y: auto;
            background: #fff;
          "
        >
          <div v-if="state.show" style="padding-top: 10px">
            <div>
              <label for="defect-select">Select a defect:</label>
              <select id="defect-select" v-model="state.selectedDefect" class="defect-dropdown">
                <option v-for="(defect, index) in getAllDefects()" :key="index" :value="defect">
                  {{ defect.defectDescription }}
                </option>
              </select>
            </div>
            <tools></tools>
            <!-- New font style use -->
            <!-- <Button @click="getFontJson" size="small">获取字体数据</Button> -->
            <set-size></set-size>
            <bg-bar></bg-bar>
            <group></group>
            <replaceImg></replaceImg>
            <filters></filters>
            <div class="attr-item">
              <lock></lock>
              <dele></dele>
              <clone></clone>
            </div>
            <!-- Group-to alignment -->
            <align></align>
            <!-- Alignment -->
            <center-align></center-align>
            <!-- Turn over -->
            <flip></flip>
          </div>
          <attribute v-if="state.show"></attribute>
        </div>
      </Content>
    </Layout>
  </div>
</template>

<script name="Home" setup>
// Imported elements
import importFile from '@/components/importFile.vue';
// import EngineList from '../../components/enginecomponents/EngineList.vue';
import api from '../../services/api';
import { Engine } from '../../models/Engine';
// Top component
import align from '@/components/align.vue';
import centerAlign from '@/components/centerAlign.vue';
import flip from '@/components/flip.vue';
import previewCurrent from '@/components/previewCurrent';
import save from '@/components/save.vue';
import clone from '@/components/clone.vue';
import group from '@/components/group.vue';
import zoom from '@/components/zoom.vue';
import dragMode from '@/components/dragMode.vue';
import lock from '@/components/lock.vue';
import dele from '@/components/del.vue';

// Left component
import tools from '@/components/tools.vue';
import bgBar from '@/components/bgBar.vue';
import setSize from '@/components/setSize.vue';
import replaceImg from '@/components/replaceImg.vue';
import filters from '@/components/filters.vue';

// Right component
import history from '@/components/history.vue';
import layer from '@/components/layer.vue';
import attribute from '@/components/attribute.vue';

// Functional component
import { CanvasEventEmitter } from '@/utils/event/notifier';
// import { downFile } from '@/utils/utils';
import { fabric } from 'fabric';
import Editor, {
  DringPlugin,
  AlignGuidLinePlugin,
  ControlsPlugin,
  ControlsRotatePlugin,
  CenterAlignPlugin,
  LayerPlugin,
  CopyPlugin,
  MoveHotKeyPlugin,
  DeleteHotKeyPlugin,
  GroupPlugin,
  DrawLinePlugin,
  GroupTextEditorPlugin,
  GroupAlignPlugin,
  WorkspacePlugin,
  DownFontPlugin,
  HistoryPlugin,
  FlipPlugin,
  RulerPlugin,
} from '@/core';

// Create an editor
const canvasEditor = new Editor();

const event = new CanvasEventEmitter();
// const canvas = {};

const state = reactive({
  menuActive: 1,
  show: false,
  select: null,
  ruler: false,
  enginesData: [],
  selectedDefect: null,
});
const allSubtasks = computed(() => {
  let subtasks = [];
  state.enginesData.forEach((engine) => {
    engine.engineSections.forEach((section) => {
      section.engineParts.forEach((part) => {
        part.tasks.forEach((task) => {
          subtasks = subtasks.concat(task.subtasks);
        });
      });
    });
  });
  return subtasks;
});
const loadSubtaskImage = (subtask) => {
  if (subtask.subtaskImageUrl) {
    const imgEl = document.createElement('img');
    imgEl.src = subtask.subtaskImageUrl;
    imgEl.onload = () => {
      const imgInstance = new fabric.Image(imgEl, {
        left: 100,
        top: 100,
      });
      canvasEditor.canvas.add(imgInstance);
      canvasEditor.canvas.setActiveObject(imgInstance);
      canvasEditor.canvas.renderAll();
    };
  } else {
    throw new Error('Subtask does not have a valid image URL: ' + JSON.stringify(subtask));
  }
};
const getAllDefects = () => {
  let defects = [];
  state.enginesData.forEach((engine) => {
    engine.engineSections.forEach((section) => {
      section.engineParts.forEach((part) => {
        part.tasks.forEach((task) => {
          task.subtasks.forEach((subtask) => {
            defects = defects.concat(subtask.subtaskDefects);
          });
        });
      });
    });
  });
  return defects;
};
onMounted(async () => {
  // Initialize fabric
  const canvas = new fabric.Canvas('canvas', {
    fireRightClick: true, // Right -click, the number of Button is 3
    stopContextMenu: true, // By default right -click menu
    controlsAboveOverlay: true, // After beyond the clippath, the control bar still shows
  });

  const response = await api.get('/engines');
  state.enginesData = response.data.map((engineData, index) => {
    try {
      console.log(engineData); // to log the engine data
      return new Engine(engineData.engineLine, engineData.engineSections);
    } catch (error) {
      console.error(`Error creating engine at index ${index} with data`, engineData, error);
    }
  });

  canvasEditor.init(canvas);
  canvasEditor.use(DringPlugin);
  canvasEditor.use(AlignGuidLinePlugin);
  canvasEditor.use(ControlsPlugin);
  canvasEditor.use(ControlsRotatePlugin);
  canvasEditor.use(CenterAlignPlugin);
  canvasEditor.use(LayerPlugin);
  canvasEditor.use(CopyPlugin);
  canvasEditor.use(MoveHotKeyPlugin);
  canvasEditor.use(DeleteHotKeyPlugin);
  canvasEditor.use(GroupPlugin);
  canvasEditor.use(DrawLinePlugin);
  canvasEditor.use(GroupTextEditorPlugin);
  canvasEditor.use(GroupAlignPlugin);
  canvasEditor.use(WorkspacePlugin);
  canvasEditor.use(DownFontPlugin);
  canvasEditor.use(HistoryPlugin);
  canvasEditor.use(FlipPlugin);
  canvasEditor.use(RulerPlugin);

  event.init(canvas);
  state.show = true;
});

const rulerSwitch = (val) => {
  if (val) {
    canvasEditor.rulerEnable();
  } else {
    canvasEditor.rulerDisable();
  }
};
provide('fabric', fabric);
provide('event', event);
provide('canvasEditor', canvasEditor);
</script>

<style lang="less" scoped>
@import '@mdi/font/css/materialdesignicons.min.css';

.mdi {
  font-family: 'Material Design Icons';
  font-size: 24px;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #00003d; /* Change to your preferred color */
  color: white;
}

.navbar-title {
  margin-left: 10px;
  color: white;
}

.navbar-content {
  display: flex;
  align-items: center;
}

.icon-button {
  display: flex;
  margin-right: 25px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

.icon-button .material-icons {
  font-size: 24px;
}
.logo {
  width: 30px;
  height: 30px;
  display: inline-block;
  margin-right: 10px;
  text-align: center;
  vertical-align: middle;
  .ivu-icon {
    vertical-align: super;
  }
}
.subtask-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.subtask-item {
  padding: 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background 0.3s;
}

.subtask-item:hover {
  background: #f5f5f5;
}
.defect-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.defect-item {
  padding: 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background 0.3s;
}

.defect-item:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.defect-content h3 {
  margin: 0;
  font-size: 16px;
  color: #333;
}

.defect-content p {
  margin: 5px 0 0;
  font-size: 14px;
  color: #666;
}
// Attribute panel style
:deep(.attr-item) {
  position: relative;
  margin-bottom: 12px;
  height: 40px;
  padding: 0 10px;
  background: #f6f7f9;
  border: none;
  border-radius: 4px;
  display: flex;
  align-items: center;
  .ivu-tooltip {
    text-align: center;
    flex: 1;
  }
}

.ivu-menu-vertical .menu-item {
  text-align: center;
  padding: 10px 2px;
  box-sizing: border-box;
  font-size: 12px;

  & > i {
    margin: 0;
  }
}

:deep(.ivu-layout-header) {
  --height: 45px;
  padding: 0 10px;
  border-bottom: 1px solid #eef2f8;
  background: #fff;
  height: var(--height);
  line-height: var(--height);
}
.defect-dropdown {
  width: 75%;
  height: 75%;
  display: block;
  font-size: 16px;
  font-weight: 700;
  color: #444;
  line-height: 1.3;
  padding: 0.6em 1.4em 0.5em 0.8em;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  margin: 0;
  border: 1px solid #aaa;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
  border-radius: 0.5em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069a18%2018%200%2000-13-5H18c-5%200-9%203-11%207a18%2018%200%2000-5%2013c0%205%202%209%205%2013l128%20128c4%204%208%205%2013%205s9-1%2013-5L287%2095c3-4%205-8%205-13z%22%2F%3E%3C%2Fsvg%3E');
  background-repeat: no-repeat, repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;
}

.defect-dropdown::-ms-expand {
  display: none;
}

.defect-dropdown:hover {
  border-color: #888;
}

.defect-dropdown:focus {
  border-color: #aaa;
  box-shadow: 0 0 1px 3px rgba(59, 153, 252, 0.7);
  box-shadow: 0 0 0 3px -moz-mac-focusring;
  color: #222;
  outline: none;
}

.defect-dropdown option {
  font-weight: normal;
}

.home,
.ivu-layout {
  height: 100vh;
}

.icon {
  display: block;
}

.canvas-box {
  position: relative;
}
// Inner shadow of canvas
.inside-shadow {
  position: absolute;
  width: 100%;
  height: 100%;
  box-shadow: inset 0 0 9px 2px #0000001f;
  z-index: 2;
  pointer-events: none;
}

#canvas {
  width: 300px;
  height: 300px;
  margin: 0 auto;
}

#workspace {
  overflow: hidden;
}

.content {
  flex: 1;
  width: 220px;
  padding: 10px;
  padding-top: 0;
  height: 100%;
  overflow-y: auto;
}

.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
  background: none;
}
// Tab
.switch {
  margin-right: 10px;
}
// Grid background
.design-stage-grid {
  --offsetX: 0px;
  --offsetY: 0px;
  --size: 16px;
  --color: #dedcdc;
  background-image: linear-gradient(
      45deg,
      var(--color) 25%,
      transparent 0,
      transparent 75%,
      var(--color) 0
    ),
    linear-gradient(45deg, var(--color) 25%, transparent 0, transparent 75%, var(--color) 0);
  background-position: var(--offsetX) var(--offsetY),
    calc(var(--size) + var(--offsetX)) calc(var(--size) + var(--offsetY));
  background-size: calc(var(--size) * 2) calc(var(--size) * 2);
}
</style>
