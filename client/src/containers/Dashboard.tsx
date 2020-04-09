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
const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? process.env.HOSTNAME : 'http://localhost:5000',
});
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

export interface UpdatedDate {
  updatedDate: string;
}

const Dashboard: React.FunctionComponent = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await axiosInstance.get('/api/data').then(data => {
        setData(data.data);
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
            <Component totalData={data[0]['dataArray']} updatedDate={data[1]['updatedDate']} />
          </Card>
        ))}
      </div>
    </>
  );

  return dashboard;
};

export default Dashboard;
