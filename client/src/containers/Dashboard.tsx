import * as React from 'react';
import { Overview } from '../components/Overview';
import Gender from '../components/Gender';
import AgeGroup from '../components/AgeGroup';
import Dhb from '../components/Dhb';
import { Card } from 'reactstrap';
import '../App.scss';
import { TotalCases } from '../components/TotalCases';
import { InternationTravel } from '../components/InternationalTravel';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { LastCountryVisted } from '../components/LastCountryVisited';
const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? process.env.HOSTNAME : 'http://localhost:5000',
});
const components: Array<any> = [
  Overview,
  Gender,
  AgeGroup,
  Dhb,
  TotalCases,
  InternationTravel,
  LastCountryVisted,
];

export interface Data {
  'Date of report'?: string;
  Sex?: string;
  'Age group': string;
  DHB?: string;
  'International travel'?: string;
  'Last country before return': string;
  flightNumber?: string;
  arrivalDate?: string;
}

const Dashboard: React.FunctionComponent = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axiosInstance.get('/api/data').then(data => {
          setData(data.data);
          setLoading(false);
        });
      } catch (error) {
        console.log(error);
      }
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
            <Component
              confirmedCases={data[0]['confirmedCases']}
              probableCases={data[1]['probableCases']}
            />
          </Card>
        ))}
      </div>
    </>
  );

  return dashboard;
};

export default Dashboard;
