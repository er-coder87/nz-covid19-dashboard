import * as React from 'react';
import data from '../data/data';
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
      <ListGroupItem>NZ probable case: 50</ListGroupItem>
      <ListGroupItem>NZ Total confirmed case: {data.length + 50}</ListGroupItem>
    </ListGroup>
  );
};
