import React from 'react';
import Chart from 'react-google-charts';

interface Props {
  Main: number | undefined;
  LoanIsa: number | undefined;
}

const ChartPage = (props: Props) => {
  const { Main, LoanIsa } = props;
  return (
    <Chart
      width={'420px'}
      height={'300px'}
      chartType='PieChart'
      loader={<div>Loading Chart</div>}
      data={[['Account', 'value'], ['Main', Main], ['ISA', LoanIsa]]}
      options={{
        title: 'Investment summary',
        // Just add this option
        is3D: true,
        chartArea: { left: 0, top: 20, right: 0, bottom: 20 },
        legend: 'bottom',
      }}
      rootProps={{ 'data-testid': '2' }}
    />
  );
};
export default ChartPage;
