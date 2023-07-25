

declare interface IPluginOption {
  [propName: string]: unknown;
}

declare type IEditorHooksType =
  | 'hookImportBefore'
  | 'hookImportAfter'
  | 'hookSaveBefore'
  | 'hookSaveAfter';

declare interface IPluginClass extends IPluginTempl {
  new (canvas: fabric.Canvas, editor: any, options: IPluginOption): IPluginTempl;
}

declare interface IPluginMenu {
  text: string;
  command?: () => void;
  child?: IPluginMenu[];
}

declare interface IPluginTempl {
  pluginName: string;
  events: string[];
  apis: string[];
  canvas: fabric.Canvas;
  hotkeyEvent: (name: string, e: Event) => viode;
  [propName: IEditorHooksType]: () => void;
  [propName: string]: any;
}
