<!--
 * @Author: 秦少卫
 * @Date: 2022-09-03 19:16:55
 * @LastEditors: 秦少卫
 * @LastEditTime: 2023-07-16 13:56:21
 * @Description: 导入模板
-->

<template>
  <div style="display: inline-block">
    <Divider plain orientation="left">{{ $t('title_template') }}</Divider>
    <Tooltip
      :content="item.label"
      v-for="(item, i) in state.list"
      :key="`${i}-bai1-button`"
      placement="top"
    >
      <img
        class="tmpl-img"
        :alt="item.label"
        v-lazy="item.src"
        @click="getTempData(item.tempUrl)"
      />
    </Tooltip>
  </div>
</template>

<script setup name="ImportTmpl">
import useSelect from '@/hooks/select';
// import { downFontByJSON } from '@/utils/utils';
import axios from 'axios';
import { Spin } from 'view-ui-plus';
import { useI18n } from 'vue-i18n';

const repoSrc = import.meta.env.APP_REPO;
const { t } = useI18n();
const { canvasEditor } = useSelect();
const state = reactive({
  jsonFile: null,
  list: [],
});

const insertSvgFile = () => {
  canvasEditor.insertSvgFile(state.jsonFile);
};

const getTempList = () => {
  Spin.show({
    render: (h) => h('div', t('alert.loading_data')),
  });
  const getTemp = axios.get(`${repoSrc}template/index.json`);
  getTemp
    .then((res) => {
      state.list = res.data.data.map((item) => {
        item.tempUrl = repoSrc + item.tempUrl;
        item.src = repoSrc + item.src;
        return item;
      });
      Spin.hide();
    })
    .catch(Spin.hide);
};

const getTempData = (tmplUrl) => {
  Spin.show({
    render: (h) => h('div', t('alert.loading_data')),
  });
  const getTemp = axios.get(tmplUrl);
  getTemp.then((res) => {
    state.jsonFile = JSON.stringify(res.data);
    Spin.hide();
    insertSvgFile();
  });
};

getTempList();
</script>

<style scoped lang="less">
.tmpl-img {
  width: 94px;
  cursor: pointer;
  margin-right: 5px;
}
</style>
