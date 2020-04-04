import * as React from 'react';
import { Overview } from '../components/Overview';

import data from '../data/data';
import data_probable from '../data/data_probable';
import Gender from '../components/Gender';
import AgeGroup from '../components/AgeGroup';
import Dhb from '../components/Dhb';
import { Card } from 'reactstrap';
import '../App.scss';
import { TotalCases } from '../components/TotalCases';
import { InternationTravel } from '../components/InternationalTravel';

const components: Array<any> = [Overview, Gender, AgeGroup, Dhb, TotalCases, InternationTravel];

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

const Dashboard: React.FunctionComponent = () => {
  const totalData = [...data, ...data_probable];
  return (
    <>
      <div className="d-flex flex-wrap">
        {components.map((Component, index) => (
          <Card key={index} className="p-3 m-1 bg-dark hoverEffect">
            <Component totalData={totalData} />
          </Card>
        ))}
      </div>
    </>
  );
};

export default Dashboard;
