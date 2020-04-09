import * as React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { TitledSection } from '../common/TiledSection';
import { Data } from '../containers/Dashboard';

interface Props {
  confirmedCases: Array<Data>;
  probableCases: Array<Data>;
}

const Gender: React.FunctionComponent<Props> = ({ confirmedCases, probableCases }) => {
  const totalData = [...confirmedCases, ...probableCases];
  const numberOfMales = totalData.filter(a => a.Sex === 'Male').length;
  const numberOfFemales = totalData.filter(a => a.Sex === 'Female').length;
  const unknowns = totalData.length - numberOfFemales - numberOfMales;
  // For a pie chart
  const data = {
    datasets: [
      {
        data: [numberOfMales, numberOfFemales, unknowns],
        backgroundColor: ['#36A2EB', '#FF6384', '#FFD166'],
      },
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: ['Male', 'Female', 'Not specified'],
  };

  return (
    <TitledSection title="Gender">
      <Doughnut
        data={data}
        width={400}
        height={400}
        options={{
          responsive: true,
          maintainAspectRatio: true,
          legend: {
            display: true,
            labels: {
              fontColor: '#FFFFFF',
              fontSize: 10,
            },
          },
        }}
      ></Doughnut>
    </TitledSection>
  );
};

export default Gender;
