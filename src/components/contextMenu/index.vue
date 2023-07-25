<template>
  <ul
    ref="mouseMenuRef"
    class="menu-wrap"
    :style="{
      visibility: state.show,
      left: state.left,
      top: state.top,
      zIndex: state.zIndex,
    }"
    @click="handleMenu"
  >
    <menu-item v-for="menu in menuList" :key="menu.activeName" :nodeInfo="menu" />
  </ul>
</template>

<script name="MouseMenu" setup>
import { isEmpty, debounce } from 'lodash-es';
import useSelect from '@/hooks/select';
import menuItem from './menuItem.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { canvas } = useSelect();
const canvasDom = document.getElementById('canvas') || null;
// 菜单
const menuList = [
  {
    type: 'copy',
    activeName: 'copy',
    text: t('mouseMenu.copy'),
    subText: 'Copy',
  },
  {
    type: 'group',
    activeName: 'group',
    text: t('mouseMenu.group'),
    subText: 'Group',
  },
  // 对齐
  {
    type: 'center',
    activeName: 'center',
    text: t('mouseMenu.center'),
    subText: 'Center',
  },
  // 排序
  {
    type: 'sort',
    activeName: '',
    text: t('mouseMenu.layer'),
    subText: '',
    children: [
      {
        type: 'sort',
        activeName: 'up',
        text: t('mouseMenu.up'),
        subText: 'Up',
      },
      {
        type: 'sort',
        activeName: 'down',
        text: t('mouseMenu.down'),
        subText: 'Down',
      },
      {
        type: 'sort',
        activeName: 'upTop',
        text: t('mouseMenu.upTop'),
        subText: 'BringToFront',
      },
      {
        type: 'sort',
        activeName: 'downTop',
        text: t('mouseMenu.downTop'),
        subText: 'SendToBack',
      },
    ],
  },
  // 删除
  {
    type: 'delete',
    activeName: 'delete',
    text: t('mouseMenu.delete'),
    subText: 'Delete',
  },
];
const state = reactive({
  show: 'hidden',
  left: 0,
  top: 0,
  zIndex: -100,
  menu: null,
});
const mouseMenuRef = ref(null);
// 单选且等于组元素
// const isGroup = computed(() => {
//   return mixinState.mSelectMode === 'one' && mixinState.mSelectOneType === 'group';
// });
// // 是否为多选
// const isMultiple = (() => mixinState.mSelectMode === 'multiple');

const showMenu = (x, y) => {
  state.show = 'visible';
  state.left = `${x}px`;
  state.top = `${y}px`;
  state.zIndex = 100;
};

const hideMenu = () => {
  state.show = 'hidden';
  state.left = 0;
  state.top = 0;
  state.zIndex = -100;
};

const clickHide = (e) => {
  if (e.target !== canvasDom && state.show === 'visible') {
    hideMenu();
  }
};

const handleMenu = (e) => {
  const active = e.target.dataset.active || e.srcElement.dataset.active;
  if (!active) return this.hideMenu();
  const activeObject = canvas.c.getActiveObjects();
  switch (active) {
    case 'copy':
      canvas.editor.clone();
      break;
    case 'delete':
      activeObject && activeObject.map((item) => canvas.c.remove(item));
      canvas.c.requestRenderAll();
      canvas.c.discardActiveObject();
      break;
    case 'center':
      canvas.editor.centerAlign.position('center');
      break;
    case 'group':
      canvas.editor.group();
      break;
    case 'unGroup':
      canvas.editor.unGroup();
      break;
    case 'up':
      canvas.editor.up();
      break;
    case 'down':
      canvas.editor.down();
      break;
    case 'upTop':
      canvas.editor.upTop();
      break;
    case 'downTop':
      canvas.editor.downTop();
      break;
    default:
      break;
  }
  hideMenu();
};

const init = () => {
  if (!isEmpty(canvas) && !isEmpty(canvas.c)) {
    canvas.c.on('mouse:down', handleMouseUp);
  } else {
    hideMenu();
  }
};

onMounted(() => {
  nextTick(() => {
    state.menu = mouseMenuRef.value;
    state.menu && (state.menu.oncontextmenu = (e) => e.preventDefault());
    init();
  });
  //Surveillance click to hide (right -click on the outside and right -click with Fabric, because you can hide it if you click on the non -Canvas to hide)
  window.addEventListener('click', debounce(clickHide, 200));
});

onBeforeUnmount(() => {
  window.removeEventListener('click', clickHide);
});

function handleMouseUp(opt) {
  try {
    const ctx = canvas.c;
    const activeObject = ctx.getActiveObjects();
    if (!activeObject.length) return hideMenu();
    if (opt.button === 3 && opt.target && opt.target.id !== 'workspace') {
      // Display menu, set the right -click menu position 
       // Get the width height of the menu component
      const menuWidth = state.menu.offsetWidth;
      const menuHeight = state.menu.offsetHeight;
      // Current mouse location
      let pointX = opt.pointer.x;
      let pointY = opt.pointer.y;

     // Calculate the location of the menu appears 
       // If the mouse is close to the right side of the picture, the menu appears on the left side of the mouse pointer
      if (ctx.width - pointX <= menuWidth) {
        pointX -= menuWidth;
      }
      // 如果鼠标靠近画布底部，菜单就出现在鼠标指针上方
      if (ctx.height - pointY <= menuHeight) {
        pointY -= menuHeight;
      }
      showMenu(pointX, pointY);
    } else {
      hideMenu();
    }
  } catch (error) {
    console.log(error);
  }
}
</script>

<style lang="less" scoped>
.menu-wrap {
  width: 196px;
  padding: 8px 0;
  position: absolute;
  border: 1px solid #e8eaec;
  left: 0;
  top: 0;
  border-radius: 4px;
  visibility: hidden;
  list-style: none;
  /* 隐藏菜单 */
  z-index: -100;
  box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.08);
  background: #fff;

  & > li {
    color: #33383e;
    cursor: pointer;
    padding: 6px 10px;

    span {
      float: right;
      color: #bdbdbd;
    }

    border-bottom: 1px solid #e8eaec;

    &:hover {
      background-color: #f1f3f4;
    }

    &:last-child {
      border-bottom: none;
    }
  }

  .del {
    color: red;
  }
}
</style>
