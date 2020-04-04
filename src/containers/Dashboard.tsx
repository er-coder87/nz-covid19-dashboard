import * as React from 'react';
import { Overview } from '../components/Overview';

import data from '../data/data';
import Sex from '../components/Sex';
import AgeGroup from '../components/AgeGroup';
import Dhb from '../components/Dhb';
import { Card } from 'reactstrap';
import '../App.scss';
import { TotalCases } from '../components/TotalCases';

const components: Array<any> = [Overview, Sex, AgeGroup, Dhb, TotalCases];

const Dashboard: React.FunctionComponent = () => {
  console.log(data);

  return (
    <>
      <div className="d-flex flex-wrap">
        {components.map((Component, index) => (
          <Card key={index} className="p-3 m-1 bg-dark hoverEffect">
            <Component totalData={data} />
          </Card>
        ))}
      </div>
    </>
  );
};

export default Dashboard;
