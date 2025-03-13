import React, { memo } from 'react';
import {} from 'antd-mobile';
import { ReceiptOutline, ReceivePaymentOutline } from 'antd-mobile-icons';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import s from './style.module.less';

interface Ipropos {
  bill: {
    billId: number;
    billType: string;
    createAt: string;
    money: number;
    remark: string;
  };
}

const BillItem: React.FC<Ipropos> = props => {
  const { billId, billType, money, createAt, remark } = props.bill;
  const navigate = useNavigate();

  return (
    <>
      <div className={s.wrap} onClick={() => navigate(`/detail/${billId}`)}>
        <div className={s.top}>
          <div className={s.type}>
            {billType === '支出' ? (
              <ReceiptOutline />
            ) : (
              <ReceivePaymentOutline />
            )}
            <span>{remark}</span>
          </div>
          <div
            className={s.money}
            style={{ color: billType === '支出' ? '#007fff' : '#ecbe25' }}
          >
            {billType === '收入' ? '+' : '-'}
            {money}
          </div>
        </div>
        <div className={s.time}>{dayjs(+createAt).format('HH:mm')}</div>
      </div>
    </>
  );
};

export default memo(BillItem);
