import React, { memo, useState } from 'react';
import { Button } from 'antd-mobile';

import TypePopup from '@/components/type-popup';
import BillPopup from '@/components/bill-popup';
import taxios from '@/service';
import s from './style.module.less';

const Test: React.FC = () => {
  const [isShowType, setIsShowType] = useState(false);
  const [showAddBill, setShowAddBill] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const getList = () => {};
  return (
    <>
      {/* <Button
        onClick={() => {
          setShowAddBill(true);
        }}
        color="primary"
      >
        测试
      </Button>
      <TypePopup
        isShow={isShowType}
        setIsShow={setIsShowType}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      /> */}
      <BillPopup
        isShow={true}
        afterConfirm={getList}
        setIsShow={setShowAddBill}
        billOperateType="add"
      />
    </>
  );
};

export default memo(Test);
