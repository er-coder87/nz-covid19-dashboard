import * as React from 'react';
import { TotalData } from './Sex';
import { TitledSection } from '../common/TiledSection';
import { Bar } from 'react-chartjs-2';

export const InternationTravel: React.FunctionComponent<TotalData> = ({ totalData }) => {
  const yes = totalData.filter(a => a.internationalTravel === 'Yes').length;
  const no = totalData.filter(a => a.internationalTravel === 'No').length;
  const unknown = totalData.length - yes - no;

  const data = {
    datasets: [
      {
        data: [yes, no, unknown],
        backgroundColor: '#FF6384',
      },
    ],
    labels: ['Yes', 'No', 'Unknown'],
  };
  return (
    <TitledSection title="Internation travels">
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
