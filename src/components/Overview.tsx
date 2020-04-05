import * as React from 'react';
import data from '../data/data';
import data_probable from '../data/data_probable';
import { ListGroup, ListGroupItem } from 'reactstrap';

interface IOverviewProps {}

const getTodayDate = () => {
  var today = new Date();
  return formatDateToString(today);
};

export const formatDateToString = (date: Date) => {
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
};

export const Overview: React.FunctionComponent<IOverviewProps> = props => {
  return (
    <ListGroup>
      <ListGroupItem>Date: {getTodayDate()}</ListGroupItem>
      <ListGroupItem>NZ confirmed cases: {data.length}</ListGroupItem>
      <ListGroupItem>NZ probable cases: {data_probable.length}</ListGroupItem>
      <ListGroupItem>NZ total cases: {data.length + data_probable.length}</ListGroupItem>
    </ListGroup>
  );
};
