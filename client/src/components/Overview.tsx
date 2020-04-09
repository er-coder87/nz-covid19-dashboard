import * as React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Data } from '../containers/Dashboard';

const getTodayDate = () => {
  var today = new Date();
  return formatDateToString(today);
};

export const formatDateToString = (date: Date) => {
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
};

interface Props {
  confirmedCases: Array<Data>;
  probableCases: Array<Data>;
  updatedDate: string;
}

export const Overview: React.FunctionComponent<Props> = ({
  confirmedCases,
  probableCases,
  updatedDate,
}) => (
  <ListGroup>
    <ListGroupItem>Date: {getTodayDate()}</ListGroupItem>
    <ListGroupItem>
      Last updated date: {formatDateToString(new Date(JSON.parse(updatedDate)))}
    </ListGroupItem>
    <ListGroupItem>NZ confirmed cases: {confirmedCases.length}</ListGroupItem>
    <ListGroupItem>NZ probable cases: {probableCases.length}</ListGroupItem>
    <ListGroupItem>NZ total cases: {confirmedCases.length + probableCases.length}</ListGroupItem>
  </ListGroup>
);
