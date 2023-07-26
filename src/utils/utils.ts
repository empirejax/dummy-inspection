import FontFaceObserver from 'fontfaceobserver';
import { useClipboard, useFileDialog, useBase64 } from '@vueuse/core';
import { Message } from 'view-ui-plus';
import downloadjs from 'downloadjs';

interface Font {
  type: string;
  fontFamily: string;
}

/**
 * @description: 
 * @param {Blob|File} file 
 * @return {String}
 */
export function getImgStr(file: File | Blob): Promise<FileReader['result']> {
  return useBase64(file).promise.value;
}

/**
 * @description: 
 * @param {String} str
 * @return {Promise}
 */
export function downFontByJSON(str: string) {
  const skipFonts = ['arial', 'Microsoft YaHei'];
  const fontFamilies: string[] = JSON.parse(str)
    .objects.filter(
      (item: Font) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        item.type.includes('text') && !skipFonts.includes(item.fontFamily)
    )
    .map((item: Font) => item.fontFamily);
  const fontFamiliesAll = fontFamilies.map((fontName) => {
    const font = new FontFaceObserver(fontName);
    return font.load(null, 150000);
  });
  return Promise.all(fontFamiliesAll);
}

/**
 * @description: 
 * @param {Object} options accept = '', capture = '', multiple = false
 * @return {Promise}
 */
export function selectFiles(options: {
  accept?: string;
  capture?: string;
  multiple?: boolean;
}): Promise<FileList | null> {
  return new Promise((resolve) => {
    const { onChange, open } = useFileDialog(options);
    onChange((files) => {
      resolve(files);
    });
    open();
  });
}

/**
 * @description:
 * @param { String } file 
 * @param { String } fileName 
 * @param { String } fileExt 
 * @param { String } strMimeType MIME content-type
 */
interface IDownLoadFile {
  file: string;
  fileName?: string | undefined;
  fileExt?: string | undefined;
  strMimeType?: string | undefined;
}
export function downloadFile({ file, fileName, fileExt, strMimeType }: IDownLoadFile) {
  if (!file) throw new Error('file is undefined');
  const reg = /(http|https):\/\/([\w.]+\/?)\S*/;
  const outFileName = fileName ? `${fileName}.${fileExt}` : '';
  // download netword file
  if (reg.test(file)) {
    if (fileName && !fileExt) throw new Error('fileExt is undefined');
    return downloadjs(file, outFileName);
  } else {
    return downloadjs(file, outFileName, strMimeType);
  }
}

/**
 * @description: 
 * @param {String} str 
 * @return {Promise} 
 */
export function insertImgFile(str: string) {
  return new Promise((resolve) => {
    const imgEl = document.createElement('img');
    imgEl.src = str;
    document.body.appendChild(imgEl);
    imgEl.onload = () => {
      resolve(imgEl);
    };
  });
}

/**
 * Copying text to the clipboard
 * @param source Copy source
 * @param options Copy options
 * @returns Promise that resolves when the text is copied successfully, or rejects when the copy fails.
 */
export const clipboardText = async (
  source: string,
  options?: Parameters<typeof useClipboard>[0]
) => {
  try {
    await useClipboard({ source, ...options }).copy();
    Message.success('Replication');
  } catch (error) {
    Message.error('Copy failure');
    throw error;
  }
};
