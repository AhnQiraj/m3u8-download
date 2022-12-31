import {
  PageContainer,
  LoginForm,
  ProFormText,
} from '@ant-design/pro-components';
import { useModel, useNavigate } from '@umijs/max';
// import { useNavigate } from 'umi';

import { login } from '@/services/UserController';

const HomePage: React.FC = () => {
  const { setInitialState } = useModel('@@initialState');
  const navigate = useNavigate();
  return (
    <PageContainer ghost>
      <LoginForm
        onFinish={async (formData: API.UserInfo) => {
          return login(formData).then((res) => {
            if (res?.error?.returnCode === '0' && res.data) {
              setInitialState(res.data);
              localStorage.setItem('userInfo', JSON.stringify(res.data));
              navigate('/table');
            }
          });
        }}
      >
        <ProFormText
          name="mobile"
          placeholder="请输入爪哇的手机号"
          rules={[
            {
              required: true,
              message: '请输入手机号!',
            },
          ]}
        />
        <ProFormText.Password
          name="password"
          placeholder="请输入爪哇的密码"
          rules={[
            {
              required: true,
              message: '请输入密码!',
            },
          ]}
        />
      </LoginForm>
    </PageContainer>
  );
};

export default HomePage;
