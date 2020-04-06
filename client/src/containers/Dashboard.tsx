import * as React from 'react';
import { Overview } from '../components/Overview';
import Gender from '../components/Gender';
import AgeGroup from '../components/AgeGroup';
import Dhb from '../components/Dhb';
import { Card } from 'reactstrap';
import data from '../data/data';
import '../App.scss';
import { TotalCases } from '../components/TotalCases';
import { InternationTravel } from '../components/InternationalTravel';
import { useState, useEffect } from 'react';

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
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await fetch('/api/data')
        .then(res => res.json())
        .then(data => {
          setData(data);
          setLoading(false);
        });
    };
    fetchData();
  }, []);

  const dashboard = isLoading ? (
    <div>Page is loading...</div>
  ) : (
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

  return dashboard;
};

export default Dashboard;