import * as React from 'react';
import { Data } from '../containers/Dashboard';
import { TitledSection } from '../common/TiledSection';
import { Bar } from 'react-chartjs-2';

interface ILastCountryVistedProps {
  confirmedCases: Array<Data>;
  probableCases: Array<Data>;
}

export const LastCountryVisted: React.FunctionComponent<ILastCountryVistedProps> = ({
  confirmedCases,
  probableCases,
}) => {
  const totalData = [...confirmedCases, ...probableCases];
  const countriesVisted: Array<string> = totalData
    .map(a => a['Last country before return'])
    .filter(b => b !== undefined);

  const result: { country: string; count: number }[] = [];

  countriesVisted.forEach(element => {
    if (result.some(item => item.country === element)) {
      const index = result.findIndex(x => x.country === element);
      result[index].count += 1;
    } else {
      result.push({ country: element, count: 1 });
    }
  });

  const topTenResult = result.sort((a, b) => b.count - a.count).slice(0, 10);

  const data = {
    datasets: [
      {
        data: topTenResult.map(a => a.count),
        backgroundColor: '#FF6384',
      },
    ],
    labels: topTenResult.map(a => a.country),
  };

  return (
    <TitledSection title="Last country before return">
      <Bar
        data={data}
        width={400}
        height={400}
        options={{
          responsive: false,
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
      />
    </TitledSection>
  );
};
