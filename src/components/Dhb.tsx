import * as React from 'react';
import { TotalData } from './Sex';
import { Bar } from 'react-chartjs-2';
import { TitledSection } from '../common/TiledSection';

const Dhb: React.FunctionComponent<TotalData> = ({ totalData }) => {
  const areas = Array.from(new Set(totalData.map(item => item.dhb)));

  const infectedAreas: { area: string | undefined; number: number }[] = [];

  areas.forEach(area => {
    const mapped = totalData.filter(item => item.dhb === area);
    infectedAreas.push({
      area: area,
      number: mapped.length,
    });
  });

  const data = {
    datasets: [
      {
        data: infectedAreas.map(area => area.number),
        backgroundColor: '#FF6384',
      },
    ],
    labels: infectedAreas.map(area => area.area),
  };

  return (
    <TitledSection title="Region">
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

export default Dhb;
