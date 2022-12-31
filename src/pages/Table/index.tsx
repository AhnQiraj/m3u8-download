import services from '@/services';
import { useState } from 'react';
import {
  PageContainer,
  ProDescriptionsItemProps,
  ProTable,
} from '@ant-design/pro-components';
import { Divider } from 'antd';
import { useModel } from '@umijs/max';
import DownLoadModal from '@/components/DownLoadModal';

const { queryList } = services.UserController;

const TableList: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const [open, setOpen] = useState(false);
  const [record, setRecord] = useState<API.Course>();
  const columns: ProDescriptionsItemProps<API.Course>[] = [
    {
      title: '直播时间',
      dataIndex: 'classDate',
    },
    {
      title: '授课老师',
      dataIndex: 'teacher',
    },
    {
      title: '授课内容',
      dataIndex: 'playbackName',
    },
    {
      title: '操作',
      dataIndex: 'option',
      render: (_, record) => (
        <>
          <a href={record.resUrl}>资料下载</a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              setOpen(true);
              setRecord(record);
            }}
          >
            视频下载
          </a>
        </>
      ),
    },
  ];
  const close = () => {
    setOpen(false);
  };
  return (
    <PageContainer
      header={{
        title: '我的课程',
      }}
    >
      <ProTable<API.Course>
        headerTitle="课程"
        rowKey="id"
        request={async () => {
          const { data, error } = await queryList(initialState as API.UserInfo);
          return {
            data: data,
            success: error?.returnCode === '0',
          };
        }}
        columns={columns}
      />
      {open && <DownLoadModal open={open} record={record} onCancel={close} />}
    </PageContainer>
  );
};

export default TableList;
