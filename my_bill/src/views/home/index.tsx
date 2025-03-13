import React, { memo, useState, useEffect } from 'react';
import { PullToRefresh, DatePicker } from 'antd-mobile';
import {
  DownOutline,
  LeftOutline,
  RightOutline,
  AddCircleOutline,
} from 'antd-mobile-icons';
import TypePopup from '@/components/type-popup';
import BillPopup from '@/components/bill-popup';
import BillItem from '@/components/bill-item';

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

const Home: React.FC = () => {
  const [showTypePopup, setShowTypePopup] = useState(false);
  const [showDatePopup, setShowDatePopup] = useState(false);
  const [showAddBill, setShowAddBill] = useState(false);
  const [selectedType, setSelectedType] = useState('全部类型');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [monthTotal, setMonthTotal] = useState({ expense: 0, income: 0 });
  const [todayTotal, setTodayTotal] = useState({ expense: 0, income: 0 });
  const [todayList, setTodayList] = useState<IBill[]>([]);
  const [day, setDay] = useState(dayjs().date());
  const [list, setList] = useState([]);

  useEffect(() => {
    getList();
  }, [selectedType, selectedDate]);

  //服务器返回的一个月的数据
  const getList = async () => {
    const { data } = await taxios.get(
      `/bill/getBillList/${selectedType}/${+selectedDate}`,
    );
    setMonthTotal(data.monthTotal);
    setList(data.list);
    countDayData(data.list, day);
  };

  //计算一天的数据
  const countDayData = (allList: IBill[], currentDay: number) => {
    const _todayList = allList
      .filter((bill: IBill) => dayjs(+bill.createAt).date() === currentDay)
      .sort((a: IBill, b: IBill) => +b.createAt - +a.createAt);

    const _todayTotal = { expense: 0, income: 0 };
    _todayList.forEach((bill: IBill) => {
      bill.billType === '收入' && (_todayTotal.income += bill.money);
      bill.billType === '支出' && (_todayTotal.expense += bill.money);
    });
    setTodayTotal(_todayTotal);
    setTodayList(_todayList);
    setDay(currentDay);
  };

  const datePopupConfirm = (date: any) => {
    setSelectedDate(date);
    setShowDatePopup(false);
  };

  const onRefresh = async () => {
    return getList();
  };

  return (
    <>
      <div className={s.wrap}>
        <div className={s.header}>
          <div className={s.total}>
            <span>总支出：￥{monthTotal.expense}</span>
            <span>总收入：￥{monthTotal.income}</span>
          </div>
          <div className={s.choice}>
            <div
              className={s.billtype}
              onClick={() => setShowTypePopup(!showTypePopup)}
            >
              {selectedType}
              <DownOutline style={{ marginLeft: '4px' }} />
            </div>
            <div
              className={s.billdate}
              onClick={() => setShowDatePopup(!showDatePopup)}
            >
              {dayjs(selectedDate).format('YYYY-MM')}
              <DownOutline style={{ marginLeft: '4px' }} />
            </div>
          </div>
        </div>
        <div className={s.subtitle}>
          <div className={s.day}>
            <LeftOutline
              style={{ fontSize: 14 }}
              color="#007fff"
              onClick={() => countDayData(list, day - 1)}
            />
            <span>{`${dayjs(selectedDate).format('YYYY-MM')}-${day}`}</span>
            <RightOutline
              style={{ fontSize: 14 }}
              color="#007fff"
              onClick={() => countDayData(list, day + 1)}
            />
          </div>
          <div className={s.total}>
            <span>支出：￥{todayTotal.expense}</span>
            <span>收入：￥{todayTotal.income}</span>
          </div>
        </div>
        <div className={s.add} onClick={() => setShowAddBill(!showAddBill)}>
          <AddCircleOutline style={{ fontSize: 40, color: '#007fff' }} />
        </div>
        <div className={s.content}>
          <PullToRefresh onRefresh={onRefresh}>
            <div className={s.billitems}>
              {todayList.map((item: IBill) => (
                <BillItem key={item.billId} bill={item} />
              ))}
              <span className={s.nomore}>暂无更多数据~</span>
            </div>
          </PullToRefresh>
        </div>
        {/* 选择类型弹出框 */}
        <TypePopup
          isShow={showTypePopup}
          setIsShow={setShowTypePopup}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
        {/* 选择日期弹出框 */}
        <DatePicker
          visible={showDatePopup}
          value={selectedDate}
          precision="month"
          onCancel={() => setShowDatePopup(false)}
          onConfirm={datePopupConfirm}
        />
        {/* 添加账单弹出框 */}
        <BillPopup
          isShow={showAddBill}
          afterConfirm={getList}
          setIsShow={setShowAddBill}
          billOperateType="add"
        />
      </div>
    </>
  );
};

export default memo(Home);
