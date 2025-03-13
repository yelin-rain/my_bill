import React, { memo, useEffect, useState } from 'react';
import {} from 'antd-mobile';
import * as echarts from 'echarts';

import taxios from '@/service';
import s from './style.module.less';

interface IBill {
  billId: number;
  billType: string;
  createAt: string;
  money: number;
  remark: string;
}

const Statis: React.FC = () => {
  const [bill, setBill] = useState<IBill>();
  const [date, setDate] = useState(new Date());
  const [isShowDatePicker, setIsShowDatePicker] = useState(false);
  const [list, setList] = useState<any>({});

  useEffect(() => {
    getList();
  }, [date]);

  //服务器返回的一个月的数据
  let lineChart;
  let roseChart: echarts.ECharts;
  const getList = async () => {
    const { data } = await taxios.get(`/bill/getBillList/全部类型/${+date}`);
    setList(data.list);
  };

  // 计算两个图标的数据
  const countStatis=()=>{
    let _lineChartSeries: any = [[], []];
    let _roseChartSeries: any = [[], []];
    const tempDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    for (let i = 1; i <= tempDate.getDate(); i++) {
      _lineChartSeries[0].push(0);
      _lineChartSeries[1].push(0);
    }
  }
  //

  return (
    <>
      <div>Statis</div>
      <div className={s.wrap}></div>
    </>
  );
};

export default memo(Statis);
