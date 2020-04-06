import * as React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { TotalData } from '../containers/Dashboard';

const getTodayDate = () => {
  var today = new Date();
  return formatDateToString(today);
};

export const formatDateToString = (date: Date) => {
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
};

export const Overview: React.FunctionComponent<TotalData> = ({ totalData }) => {
  return (
    <ListGroup>
      <ListGroupItem>Date: {getTodayDate()}</ListGroupItem>
      <ListGroupItem>NZ confirmed cases: {totalData.length}</ListGroupItem>
      <ListGroupItem>NZ total cases: {totalData.length}</ListGroupItem>
    </ListGroup>
  );
};
