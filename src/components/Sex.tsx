import * as React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { TitledSection } from '../common/TiledSection';

export interface Data {
  dateOfReport?: string;
  sex?: string;
  ageGroup: string;
  dhb?: string;
  internationalTravel?: string;
  lastCountryBeforeReturn?: string;
  flightNumber?: string;
  arrivalDate?: string;
}

export interface TotalData {
  totalData: Array<Data>;
}

const Sex: React.FunctionComponent<TotalData> = ({ totalData }) => {
  const numberOfMales = totalData.filter(a => a.sex === 'Male').length;
  const numberOfFemales = totalData.filter(a => a.sex === 'Female').length;
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
    labels: ['Male', 'Female', 'unknown'],
  };

  return (
    <TitledSection title="Gender">
      <Doughnut
        data={data}
        width={500}
        height={400}
        options={{
          responsive: false,
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

export default Sex;
