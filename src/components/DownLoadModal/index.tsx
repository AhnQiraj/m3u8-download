import { Modal } from 'antd';
import type { ModalFuncProps } from 'antd';
import Promise from 'bluebird';
import { request, useModel } from '@umijs/max';
import { getUrlsWithDomain, getAESConfig } from '@/utils/format';
import AESDecryptor from '@/utils/aes.js';
import React, { useRef, useEffect } from 'react';
import { queryPlaybackUrl } from '@/services/UserController';

interface Props extends ModalFuncProps {
  record?: API.Course;
}

const DownLoadModal: React.FC<Props> = (props: Props) => {
  const { record } = props;
  const { initialState } = useModel('@@initialState');
  const name = useRef('');
  const dataList = useRef<any[]>([]);
  const aesDecryptor = new AESDecryptor();
  aesDecryptor.constructor();
  const decode = (file: any, index: number) => {
    let iv = new Uint8Array([
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      index,
    ]);
    return aesDecryptor.decrypt(file, 0, iv.buffer || iv, true);
  };

  const createElementToDownload = () => {
    let fileBlob = null;
    let a = document.createElement('a');
    fileBlob = new Blob(dataList.current, { type: 'video/MP2T' });
    a.download = `${name.current}.ts`;
    a.href = URL.createObjectURL(fileBlob);
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    a.remove();
  };
  const downLoad = (urls: string[]) => {
    urls.length = 10;
    requestIdleCallback(() => {
      Promise.map(
        urls,
        async (url: string, index: number) => {
          const data = await request(url, {
            responseType: 'arraybuffer',
            timeout: 99999,
          });
          const decodeData = decode(data, index);
          dataList.current[index] = decodeData;
        },
        { concurrency: 6 },
      ).then(createElementToDownload);
    });
  };
  useEffect(() => {
    (async () => {
      const { data } = await queryPlaybackUrl({
        id: record?.id,
        uid: initialState?.id,
        token: initialState?.token,
      });
      name.current = `${data?.playbackName}-${data?.teacher}`;
      // await setName(`${data?.playbackName}-${data?.teacher}`);
      const m3u8Str = await request(data?.playbackUrl ?? '');
      const urls = getUrlsWithDomain(data?.playbackUrl, m3u8Str);
      const aesConfig = getAESConfig(m3u8Str);
      const key = await request(aesConfig.uri, {
        responseType: 'arraybuffer',
      });
      aesDecryptor.expandKey(key);
      downLoad(urls);
    })();
  }, []);

  return (
    <Modal {...props}>
      <div>正在下载</div>
    </Modal>
  );
};

export default DownLoadModal;
