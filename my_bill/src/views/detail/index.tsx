import React, { memo, useEffect, useState } from 'react';
import { NavBar, Button, Dialog, Toast } from 'antd-mobile';
import { DeleteOutline, FillinOutline } from 'antd-mobile-icons';
import { useParams, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import taxios from '@/service';
import s from './style.module.less';
import BillPopup from '@/components/bill-popup';
import shoru from '@/assets/images/icons/收入.png';
import zhichu from '@/assets/images/icons/交易支出.png';

interface IBill {
  billId: number;
  billType: string;
  createAt: string;
  money: number;
  remark: string;
}
const Detail: React.FC = () => {
  let { billId } = useParams();
  const [bill, setBill] = useState<IBill>();
  const [isShowBillPopup, setIsShowBillPopup] = useState(false);
  const [isShowDeleteTipBox, setIsShowDeleteTipBox] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getBillDetail();
  }, []);

  const getBillDetail = async () => {
    const { data } = await taxios.get(`/bill/getBill/${billId}`);
    if (data.code === '0') {
      setBill(data.bill);
    }
  };
  const deleteBill = async () => {
    const { data } = await taxios.delete(`/bill/${billId}`);
    if (data.code === '0') {
      Toast.show('删除账单成功');
      setTimeout(() => {
        navigate('/home');
      }, 800);
    }
  };
  const deleteBillConfirm = () => {
    Dialog.show({
      title: '提示',
      content: '确定删除该条账单吗？',
      closeOnAction: true,
      actions: [
        [
          {
            key: 'cancel',
            text: '取消',
          },
          {
            key: 'confirm',
            text: '删除',
            bold: true,
            danger: true,
            onClick: deleteBill,
          },
        ],
      ],
    });
  };

  return (
    <>
      <div className={s.wrap}>
        <div className={s.nav}>
          <NavBar
            onBack={() => {
              navigate(-1);
            }}
          >
            账单详情
          </NavBar>
        </div>
        <div className={s.content}>
          <div className={s.type}>
            <img
              src={bill?.billType === '收入' ? shoru : zhichu}
              style={{ width: 30, height: 30 }}
            />
            {bill?.billType}
          </div>
          <div
            className={s.money}
            style={{ color: bill?.billType === '支出' ? '#007fff' : '#ecbe25' }}
          >
            {bill?.billType === '收入' ? '+' : '-'}
            {bill?.money}
          </div>
          <div className={s.time}>
            <span>记录时间</span>
            {dayjs(bill?.createAt).format('YYYY-MM-DD HH:mm')}
          </div>
          <div className={s.remark}>
            <span>备注</span>
            {bill?.remark}
          </div>
          <div className={s.btns}>
            <Button
              color="danger"
              fill="outline"
              style={{ width: 150, height: 50 }}
              onClick={() => {
                deleteBillConfirm();
              }}
            >
              <DeleteOutline /> 删除
            </Button>
            <Button
              color="primary"
              fill="outline"
              style={{ width: 150, height: 50 }}
              onClick={() => {
                setIsShowBillPopup(true);
              }}
            >
              <FillinOutline /> 编辑
            </Button>
          </div>
        </div>
        <BillPopup
          isShow={isShowBillPopup}
          afterConfirm={getBillDetail}
          setIsShow={setIsShowBillPopup}
          billOperateType="update"
          bill={bill}
        />
      </div>
    </>
  );
};

export default memo(Detail);
