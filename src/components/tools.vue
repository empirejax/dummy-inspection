<template>
  <div>
    <Divider orientation="center">{{ $t('common_elements') }}</Divider>
    <div class="tool-box">
      <span @click="() => addText()" :draggable="true" @dragend="onDragend('text')">
        <svg
          t="1650875455324"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="5401"
          width="26"
          height="26"
        >
          <path
            d="M213.333333 209.92v128h85.333334v-42.666667h170.666666v433.493334H384.853333v85.333333h256v-85.333333H554.666667V295.253333h170.666666v42.666667h85.333334v-128H213.333333z"
            p-id="5402"
          ></path>
        </svg>
      </span>
      <span @click="() => addTextBox()" :draggable="true" @dragend="onDragend('textBox')">
        <svg
          t="1650854954008"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="14038"
          width="26"
          height="26"
        >
          <path
            d="M720.832 692.352h-12.64L530.208 260.448a19.968 19.968 0 0 0-36.416 0L316.608 692.352h-13.44c-7.904 0-15.04 3.968-17.408 11.072a19.872 19.872 0 0 0 18.208 27.68h56.96c9.504 0 18.208-6.336 19.776-15.808a18.752 18.752 0 0 0-15.808-21.344l36.384-87.808h159.776l34.816 87.808a18.88 18.88 0 0 0-15.808 21.344c1.568 9.504 10.272 15.808 19.776 15.808h121.024c7.904 0 15.04-3.968 17.408-11.072a19.2 19.2 0 0 0-17.408-27.68z m-306.112-125.76l64.864-158.208 64.864 158.208H414.72z m-246.816-80.704c0 6.336 5.536 11.872 11.872 11.872s11.872-5.536 11.872-11.872v-23.744c0-6.336-5.536-11.872-11.872-11.872s-11.872 5.536-11.872 11.872v23.744z m0-75.936c0 6.336 5.536 11.872 11.872 11.872s11.872-5.536 11.872-11.872v-23.744c0-6.336-5.536-11.872-11.872-11.872s-11.872 5.536-11.872 11.872v23.744z m0 151.872c0 6.336 5.536 11.872 11.872 11.872s11.872-5.536 11.872-11.872v-23.744c0-6.336-5.536-11.872-11.872-11.872s-11.872 5.536-11.872 11.872v23.744z m11.872-216.736a12.16 12.16 0 0 0 11.872-11.872v-23.744c-0.8-6.336-5.536-11.072-11.872-11.072s-11.872 5.536-11.872 11.872v23.744c0 6.336 4.736 11.072 11.872 11.072z m-11.872 292.672c0 6.336 5.536 11.872 11.872 11.872s11.872-5.536 11.872-11.872v-23.744c0-6.336-5.536-11.872-11.872-11.872s-11.872 5.536-11.872 11.872v23.744z m0 75.936c0 7.104 4.736 11.872 11.872 11.872a12.16 12.16 0 0 0 11.872-11.872v-23.744c0-6.336-5.536-11.872-11.872-11.872s-11.872 5.536-11.872 11.872v23.744z m665.248-227.808c0 6.336 5.536 11.872 11.872 11.872s11.872-5.536 11.872-11.872v-23.744c0-6.336-5.536-11.872-11.872-11.872s-11.872 5.536-11.872 11.872v23.744z m0-75.936c0 6.336 5.536 11.872 11.872 11.872s11.872-5.536 11.872-11.872v-23.744c0-6.336-5.536-11.872-11.872-11.872s-11.872 5.536-11.872 11.872v23.744z m0 151.872c0 6.336 5.536 11.872 11.872 11.872s11.872-5.536 11.872-11.872v-23.744c0-6.336-5.536-11.872-11.872-11.872s-11.872 5.536-11.872 11.872v23.744z m11.072-216.736a12.16 12.16 0 0 0 11.872-11.872v-23.744c0-6.336-5.536-11.872-11.872-11.872s-11.872 5.536-11.872 11.872v23.744c0.8 7.104 5.536 11.872 11.872 11.872z m-11.072 292.672c0 6.336 5.536 11.872 11.872 11.872s11.872-5.536 11.872-11.872v-23.744c0-6.336-5.536-11.872-11.872-11.872s-11.872 5.536-11.872 11.872v23.744z m0 75.936c0 6.336 5.536 11.872 11.872 11.872s11.872-5.536 11.872-11.872v-23.744c0-6.336-5.536-11.872-11.872-11.872s-11.872 5.536-11.872 11.872v23.744z m-347.264 119.456h-23.744c-6.336 0-11.872 5.536-11.872 11.872s5.536 11.872 11.872 11.872h23.744c6.336 0 11.872-5.536 11.872-11.872s-5.536-11.872-11.872-11.872z m-75.936 0h-23.744c-6.336 0-11.872 5.536-11.872 11.872s5.536 11.872 11.872 11.872h23.744c6.336 0 11.872-5.536 11.872-11.872s-5.536-11.872-11.872-11.872z m151.872 0h-23.744c-6.336 0-11.872 5.536-11.872 11.872s5.536 11.872 11.872 11.872h23.744c6.336 0 11.872-5.536 11.872-11.872s-5.536-11.872-11.872-11.872z m-228.608 0h-23.744c-6.336 0-11.872 5.536-11.872 11.872s5.536 11.872 11.872 11.872h23.744c6.336 0 11.872-5.536 11.872-11.872s-4.736-11.872-11.872-11.872z m-75.136-7.904H222.496v-11.072a12.48 12.48 0 0 0-12.672-12.64h-18.976v-37.984c0-7.104-5.536-12.64-11.872-12.64s-11.872 5.536-11.872 12.64v37.984h-10.272a12.512 12.512 0 0 0-12.672 12.64v52.992a12.48 12.48 0 0 0 12.672 12.64h52.992a12.512 12.512 0 0 0 12.672-12.64v-11.072h35.584c7.104-1.568 12.672-7.904 12.672-14.24 0-7.104-12.672-16.608-12.672-16.608z m379.68 7.904h-23.744c-6.336 0-11.872 5.536-11.872 11.872s5.536 11.872 11.872 11.872h23.744c6.336 0 11.872-5.536 11.872-11.872s-5.536-11.872-11.872-11.872z m75.936 0h-23.744c-6.336 0-11.872 5.536-11.872 11.872s5.536 11.872 11.872 11.872h23.744c6.336 0 11.872-5.536 11.872-11.872s-4.736-11.872-11.872-11.872z m-251.52-642.304h23.744c6.336 0 11.872-5.536 11.872-11.872s-5.536-11.872-11.872-11.872h-23.744c-6.336 0-11.872 5.536-11.872 11.872s5.536 11.872 11.872 11.872z m-75.936 0h23.744c6.336 0 11.872-5.536 11.872-11.872s-5.536-11.872-11.872-11.872h-23.744c-6.336 0-11.872 5.536-11.872 11.872s5.536 11.872 11.872 11.872z m151.872 0h23.744c6.336 0 11.872-5.536 11.872-11.872s-5.536-11.872-11.872-11.872h-23.744c-6.336 0-11.872 5.536-11.872 11.872s5.536 11.872 11.872 11.872z m-227.808 0h23.744c6.336 0 11.872-5.536 11.872-11.872s-5.536-11.872-11.872-11.872h-23.744c-7.104 0.8-11.872 5.536-11.872 12.672s4.736 11.072 11.872 11.072zM257.28 167.904H221.696v-11.072a12.512 12.512 0 0 0-12.672-12.672H156.832a12.512 12.512 0 0 0-12.672 12.672v52.992c0 7.104 5.536 12.672 12.672 12.672h11.072v35.584c1.568 7.104 7.904 12.672 14.24 12.672s16.608-12.672 16.608-12.672V222.496h11.072a12.512 12.512 0 0 0 12.672-12.672v-18.976h35.584a12.16 12.16 0 0 0 11.872-11.872 12.224 12.224 0 0 0-12.672-11.072z m356.768 22.944h23.744c6.336 0 11.872-5.536 11.872-11.872s-5.536-11.872-11.872-11.872h-23.744c-6.336 0-11.872 5.536-11.872 11.872s5.536 11.872 11.872 11.872z m76.736 0h23.744c6.336 0 11.072-4.736 11.072-11.072s-5.536-11.872-11.872-11.872h-23.744c-6.336 0-11.872 5.536-11.872 11.872s5.536 11.072 12.64 11.072z m176.384-46.656h-52.992a12.48 12.48 0 0 0-12.64 12.672v11.072h-35.584c-7.104 1.568-12.64 7.904-12.64 14.24s12.64 16.608 12.64 16.608h35.584v11.072c0 7.104 5.536 12.672 12.64 12.672h18.976v37.984c0 7.104 5.536 12.672 11.872 12.672s11.872-5.536 11.872-12.672V222.528h11.072a12.48 12.48 0 0 0 12.64-12.672V156.864a13.76 13.76 0 0 0-13.44-12.672z m0 657.312h-11.072v-35.584c-1.568-7.104-7.904-12.64-14.24-12.64-7.104 0-16.608 12.64-16.608 12.64v35.584h-11.072a12.48 12.48 0 0 0-12.64 12.64v18.976h-35.584c-6.336 0-11.872 5.536-11.872 11.872s5.536 11.872 11.872 11.872h35.584v11.072a12.48 12.48 0 0 0 12.64 12.64h52.992a12.48 12.48 0 0 0 12.64-12.64v-52.992c0-7.904-5.536-13.44-12.64-13.44z"
            p-id="14039"
          ></path>
        </svg>
      </span>
      <span @click="() => addRect()" :draggable="true" @dragend="onDragend('rect')">
        <svg
          t="1650855811131"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="18499"
          width="26"
          height="26"
        >
          <path
            d="M864 896H160a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h704a32 32 0 0 1 32 32v704a32 32 0 0 1-32 32zM192 832h640V192H192v640z"
            p-id="18500"
          ></path>
        </svg>
      </span>
      <span @click="() => addCircle()" :draggable="true" @dragend="onDragend('circle')">
        <svg
          t="1650855860236"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="19440"
          width="26"
          height="26"
        >
          <path
            d="M512 928C282.624 928 96 741.376 96 512S282.624 96 512 96s416 186.624 416 416-186.624 416-416 416z m0-768C317.92 160 160 317.92 160 512s157.92 352 352 352 352-157.92 352-352S706.08 160 512 160z"
            p-id="19441"
          ></path>
        </svg>
      </span>
      <span @click="() => addTriangle()" :draggable="true" @dragend="onDragend('triangle')">
        <svg
          t="1650874633978"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2032"
          width="26"
          height="26"
        >
          <path
            d="M928.64 896a2.144 2.144 0 0 1-0.64 0H96a32.032 32.032 0 0 1-27.552-48.288l416-704c11.488-19.456 43.552-19.456 55.104 0l413.152 699.2A31.936 31.936 0 0 1 928.64 896zM152.064 832h719.84L512 222.912 152.064 832z"
            p-id="2033"
          ></path>
        </svg>
      </span>
    </div>
  </div>
</template>

<script setup name="Tools">
import { v4 as uuid } from 'uuid';
// import initializeLineDrawing from '@/core/remove/initializeLineDrawing';
import useSelect from '@/hooks/select';
import { useI18n } from 'vue-i18n';
const defaultPosition = { shadow: '', fontFamily: 'arial' };
const dragOption = {
  left: 0,
  top: 0,
};
const { t } = useI18n();
const { canvas, fabric, canvasEditor } = useSelect();
const state = reactive({
  isDrawingLineMode: false,
  isArrow: false,
});
// let drawHandler = null;

const addText = (option) => {
  const text = new fabric.IText(t('defect_text'), {
    ...defaultPosition,
    ...option,
    fontSize: 12,
    id: uuid(),
  });
  canvasEditor.canvas.add(text);
  if (!option) {
    text.center();
  }
  canvasEditor.canvas.setActiveObject(text);
};

// const addImg = (e) => {
//   const imgEl = e.target.cloneNode(true);
//   const imgInstance = new fabric.Image(imgEl, {
//     ...defaultPosition,
//     id: uuid(),
//     name: '图片default',
//   });
//   canvasEditor.canvas.add(imgInstance);
//   canvasEditor.canvas.renderAll();
// };

const addTextBox = (option) => {
  const text = new fabric.Textbox(t('defect_text'), {
    ...defaultPosition,
    ...option,
    splitByGrapheme: true,
    width: 60,
    fontSize: 12,
    id: uuid(),
  });
  canvasEditor.canvas.add(text);
  if (!option) {
    text.center();
  }
  canvasEditor.canvas.setActiveObject(text);
};

const addTriangle = (option) => {
  const triangle = new fabric.Triangle({
    ...defaultPosition,
    ...option,
    width: 60,
    height: 60,
    fill: '#92706B',
    id: uuid(),
    name: 'triangle',
  });
  canvasEditor.canvas.add(triangle);
  if (!option) {
    triangle.center();
  }
  canvasEditor.canvas.setActiveObject(triangle);
};
const addCircle = (option) => {
  const circle = new fabric.Circle({
    ...defaultPosition,
    ...option,
    radius: 25,
    fill: '#57606B',
    id: uuid(),
    name: 'Circular',
  });
  canvasEditor.canvas.add(circle);
  if (!option) {
    circle.center();
  }
  canvasEditor.canvas.setActiveObject(circle);
};

const addRect = (option) => {
  const rect = new fabric.Rect({
    ...defaultPosition,
    ...option,
    fill: '#F57274',
    width: 60,
    height: 60,
    id: uuid(),
    name: 'rectangle',
  });
  canvasEditor.canvas.add(rect);
  if (!option) {
    rect.center();
  }
  canvasEditor.canvas.setActiveObject(rect);
};
const drawingLineModeSwitch = (isArrow) => {
  state.isArrow = isArrow;
  state.isDrawingLineMode = !state.isDrawingLineMode;
  canvasEditor.setMode(state.isDrawingLineMode);
  canvasEditor.setArrow(isArrow);

  // this.canvasEditor.setMode(this.isDrawingLineMode);
  // this.canvasEditor.setArrow(isArrow);
  canvasEditor.canvas.forEachObject((obj) => {
    if (obj.id !== 'workspace') {
      obj.selectable = !state.isDrawingLineMode;
      obj.evented = !state.isDrawingLineMode;
    }
  });
};

// At the beginning of the drag, record the element type currently planned to be created
const onDragend = (type) => {
  // todo Drag and Drag and Drag this.canvas.editor.dragAddItem(event, item);
  switch (type) {
    case 'text':
      addText(dragOption);
      break;
    case 'textBox':
      addTextBox(dragOption);
      break;
    case 'rect':
      addRect(dragOption);
      break;
    case 'circle':
      addCircle(dragOption);
      break;
    case 'triangle':
      addTriangle(dragOption);
      break;
    default:
  }
};

onMounted(() => {
  nextTick(() => {
    // Line drawing
    // drawHandler = initializeLineDrawing(canvasEditor.canvas, defaultPosition);

    canvasEditor.canvas.on('drop', (opt) => {
      const offset = {
        left: canvasEditor.canvas.getSelectionElement().getBoundingClientRect().left,
        top: canvasEditor.canvas.getSelectionElement().getBoundingClientRect().top,
      };

      const point = {
        x: opt.e.x - offset.left,
        y: opt.e.y - offset.top,
      };

      const pointerVpt = canvasEditor.canvas.restorePointerVpt(point);
      dragOption.left = pointerVpt.x;
      dragOption.top = pointerVpt.y;
    });
  });
});
</script>

<style scoped lang="less">
.tool-box {
  display: flex;
  justify-content: space-around;
  span {
    flex: 1;
    text-align: center;
    padding: 5px 0;
    background: #f6f6f6;
    margin-left: 2px;
    cursor: pointer;
    &:hover {
      background: #edf9ff;
      svg {
        fill: #2d8cf0;
      }
    }
  }
  .bg {
    background: #d8d8d8;

    &:hover {
      svg {
        fill: #2d8cf0;
      }
    }
  }
}
.img {
  width: 20px;
}
</style>
