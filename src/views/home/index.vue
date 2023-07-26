<template>
  <div class="home">
    <Layout>
      <v-app-bar app flat density="default">
        <img src="/ge_monogram_dark_gray.png" height="52" />
        <v-app-bar-title class="px-3" style="color: #00003d">
          EM 72-53-02 INSEPCTION 001 - STAGE 1 - INSPECTION
        </v-app-bar-title>
        <v-spacer></v-spacer>
        <p style="color: white">223098870</p>
        <v-btn icon>
          <v-icon style="color: white">mdi-cog</v-icon>
        </v-btn>
      </v-app-bar>
      <Header v-if="state.show">
        <!-- logo -->
        <span class="logo">
          <a href="" target="_blank">
            <Icon type="logo-github" :size="30" />
          </a>
        </span>

        <!--Introduction-->
        <import-JSON></import-JSON>
        <Divider type="vertical" />
        <import-file></import-file>
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
          <previewCurrent />
          <save></save>
          <lang></lang>
        </div>
      </Header>
      <Content style="display: flex; height: calc(100vh - 64px)">
        <div v-if="state.show" style="width: 380px; height: 100%; background: #fff; display: flex">
          <Menu
            :active-name="state.menuActive"
            accordion
            @on-select="(activeIndex) => (state.menuActive = activeIndex)"
            width="65px"
          >
            <MenuItem :name="1" class="menu-item">
              <Icon type="md-book" size="24" />
              <div>{{ $t('templates') }}</div>
            </MenuItem>
            <MenuItem :name="2" class="menu-item">
              <Icon type="md-images" size="24" />
              <div>{{ $t('elements') }}</div>
            </MenuItem>
            <MenuItem :name="3" class="menu-item">
              <Icon type="md-reorder" size="24" />
              <div>{{ $t('layers') }}</div>
            </MenuItem>
          </Menu>
          <div class="content">
            <!-- Generate template -->
            <div v-show="state.menuActive === 1" class="left-panel">
              <import-tmpl></import-tmpl>
            </div>
            <!-- Background settings -->
            <div v-show="state.menuActive === 3" class="left-panel">
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
        <div style="width: 530px; height: 100%; padding: 10px; overflow-y: auto; background: #fff">
          <div v-if="state.show" style="padding-top: 10px">
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
import lang from '@/components/lang.vue';
import clone from '@/components/clone.vue';
import group from '@/components/group.vue';
import zoom from '@/components/zoom.vue';
import dragMode from '@/components/dragMode.vue';
import lock from '@/components/lock.vue';
import dele from '@/components/del.vue';

// Left component
import importTmpl from '@/components/importTmpl.vue';
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
});

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
