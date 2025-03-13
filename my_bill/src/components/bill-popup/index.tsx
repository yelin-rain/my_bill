import React, { memo, useState } from 'react';
import {
  Popup,
  Button,
  DatePicker,
  Input,
  TextArea,
  NumberKeyboard,
  Toast,
} from 'antd-mobile';
import { DownOutline } from 'antd-mobile-icons';
import dayjs from 'dayjs';

import taxios from '@/service';
import s from './style.module.less';

interface IBill {
  billId: number;
  billType: string;
  createAt: string;
  money: number;
  remark: string;
}

interface Ipropos {
  isShow: boolean;
  setIsShow: (isShow: boolean) => void;
  afterConfirm: any;
  bill?: IBill;
  billOperateType: 'update' | 'add';
}

const BillPopup: React.FC<Ipropos> = props => {
  const {
    isShow,
    setIsShow,
    afterConfirm,
    bill = null,
    billOperateType,
  } = props;
  const [money, setMoney] = useState(bill?.money.toString() || '');
  const [billType, setBillType] = useState(bill?.billType || '支出');
  // 选择日期
  const [date, setDate] = useState(
    bill?.createAt ? new Date(+bill.createAt) : new Date(),
  );
  const [remark, setRemark] = useState(bill?.remark || '');
  // 是否展示日期选择器
  const [showDatePopup, setShowDatePopup] = useState(false);
  // 是否展示数字键盘
  const [showNumberKeyboard, setShowNumberKeyboard] = useState(false);

  const now = new Date();

  const actions = {
    onInput: (key: string) => {
      if (key === '.' && money.includes('.')) {
        return;
      }
      setMoney(money + key);
    },
    onDelete: () => {
      setMoney(money.slice(0, money.length - 1));
    },
    onConfirm: async () => {
      if (!money) {
        return Toast.show('请输入金额');
      }
      if (!remark) {
        return Toast.show('请输入备注信息');
      }
      //console.log(money + ' ' + remark);
      const params = {
        money,
        createAt: +date,
        billType,
        remark,
      };
      //添加账单
      if (billOperateType === 'add') {
        const { data } = await taxios.post('/bill/addBill', params);
        if (data.code === '0') {
          Toast.show('账单添加成功');
          setIsShow(false);
          //重置输入框
          setMoney('');
          setBillType('支出');
          setDate(new Date());
          setRemark('');
          //父组件传递的确认后的事件
          afterConfirm();
        }
      }
      //修改账单
      if (billOperateType === 'update') {
        const { data } = await taxios.patch(
          `/bill/updateBill/${bill?.billId}`,
          params,
        );
        if (data.code === '0') {
          Toast.show('账单修改成功');
          setIsShow(false);
          //父组件传递的确认后的事件
          afterConfirm();
        }
      }
    },
  };

  // 选择时间
  const onDatePopupConfirm = (v: any) => {
    setDate(v);
    setShowDatePopup(false);
  };

  return (
    <>
      <div className={s.wrap}>
        <Popup
          className={s.popup}
          visible={isShow}
          onMaskClick={() => setIsShow(false)}
          onClose={() => setIsShow(false)}
          bodyStyle={{
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
            minHeight: '60vh',
          }}
        >
          <div className={s.type}>
            <Button
              className={`expense ${billType === '支出' ? 'active' : ''}`}
              onClick={() => setBillType('支出')}
            >
              支出
            </Button>
            <Button
              className={`income ${billType === '收入' ? 'active' : ''}`}
              onClick={() => setBillType('收入')}
            >
              收入
            </Button>
            <Button onClick={() => setShowDatePopup(true)}>
              {dayjs(date).format('YYYY-MM-DD')} <DownOutline />
            </Button>
          </div>
          <div className={s.input}>
            <Input placeholder="请输入金额" value={money} />
            <hr />
            <TextArea
              placeholder="请输入备注"
              showCount
              maxLength={50}
              value={remark}
              onChange={(e: string) => setRemark(e)}
            />
          </div>
          <NumberKeyboard
            visible={isShow && !showDatePopup}
            onInput={actions.onInput}
            onDelete={actions.onDelete}
            onConfirm={actions.onConfirm}
            showCloseButton={false}
            confirmText="确定"
            customKey={'.'}
          />
          <div className={s.date}>
            <DatePicker
              title="账单时间"
              visible={showDatePopup}
              onClose={() => {
                setShowDatePopup(false);
              }}
              value={date}
              max={now}
              min={new Date(2020, 0, 1)}
              onConfirm={onDatePopupConfirm}
            />
          </div>
        </Popup>
      </div>
    </>
  );
};

export default memo(BillPopup);
