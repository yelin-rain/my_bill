import React, { memo } from 'react';
import { Popup, NavBar, Button } from 'antd-mobile';

import s from './style.module.less';
interface IProps {
  isShow: boolean;
  setIsShow: any;
  selectedType: string;
  setSelectedType: any;
}

const TypePopup: React.FC<IProps> = props => {
  const { isShow, setIsShow, selectedType, setSelectedType } = props;
  const onClickBtn = (choice: string) => {
    setSelectedType(choice);
    setIsShow(false);
  };
  return (
    <>
      <div className={s.wrap}>
        <Popup
          visible={isShow}
          onMaskClick={() => setIsShow(false)}
          onClose={() => setIsShow(false)}
        >
          <div className={s.content}>
            <NavBar className={s.navBar} onBack={() => setIsShow(false)}>
              请选择类型
            </NavBar>
            <div className={s.typeList}>
              <Button
                className={s.typeItem}
                block
                color={selectedType === '全部' ? 'primary' : 'default'}
                onClick={() => {
                  onClickBtn('全部类型');
                }}
              >
                全部
              </Button>
              <Button
                className={s.typeItem}
                block
                color={selectedType === '支出' ? 'primary' : 'default'}
                onClick={() => {
                  onClickBtn('支出');
                }}
              >
                支出
              </Button>
              <Button
                className={s.typeItem}
                block
                color={selectedType === '收入' ? 'primary' : 'default'}
                onClick={() => {
                  onClickBtn('收入');
                }}
              >
                收入
              </Button>
            </div>
          </div>
        </Popup>
      </div>
    </>
  );
};
export default memo(TypePopup);
