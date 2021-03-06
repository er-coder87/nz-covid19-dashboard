import * as React from 'react';
import { TitledSection } from '../common/TiledSection';
import { Bar } from 'react-chartjs-2';
import { Data } from '../containers/Dashboard';

interface Props {
  confirmedCases: Array<Data>;
  probableCases: Array<Data>;
}

export const InternationTravel: React.FunctionComponent<Props> = ({
  confirmedCases,
  probableCases,
}) => {
  const totalData = [...confirmedCases, ...probableCases];
  const yes = totalData.filter(a => a['Overseas travel'] === 'Yes').length;
  const no = totalData.filter(a => a['Overseas travel'] === 'No').length;
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
    <TitledSection title="International travels">
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
