import * as React from 'react';
import { TotalData } from './Sex';
import { Line } from 'react-chartjs-2';
import { formatDateToString } from './Overview';
import { TitledSection } from '../common/TiledSection';

export const TotalCases: React.FunctionComponent<TotalData> = ({ totalData }) => {
  const dates = Array.from(new Set(totalData.map(item => item.dateOfReport)));
  const dailyRates: { date: Date; number: number; totalNumber: number }[] = [];

  dates.reverse().forEach((date, index) => {
    const dailyRate = totalData.filter(item => item.dateOfReport === date);
    if (index === 0) {
      dailyRates.push({
        date: new Date(date || ''),
        number: dailyRate.length,
        totalNumber: dailyRate.length,
      });
    } else {
      dailyRates.push({
        date: new Date(date || ''),
        number: dailyRate.length,
        totalNumber: dailyRate.length + dailyRates[index - 1].totalNumber,
      });
    }
  });
  let totalNumber = dailyRates.map(a => a.totalNumber);
  let day = dailyRates.map(a => formatDateToString(a.date));

  const data = {
    datasets: [
      {
        data: totalNumber,
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
      },
    ],
    labels: day,
  };

  return (
    <TitledSection title="Total confirmed cases">
      <Line
        data={data}
        width={400}
        height={400}
        options={{
          responsive: true,
          maintainAspectRatio: true,
          legend: {
            display: false,
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  fontColor: 'white',
                },
              },
            ],
            xAxes: [
              {
                ticks: {
                  fontColor: 'white',
                },
              },
            ],
          },
        }}
      ></Line>
    </TitledSection>
  );
};
