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
  totalData: Array<Data>;
  updatedDate: string;
}

export const Overview: React.FunctionComponent<Props> = ({ totalData, updatedDate }) => (
  <ListGroup>
    <ListGroupItem>Date: {getTodayDate()}</ListGroupItem>
    <ListGroupItem>NZ total cases: {totalData.length}</ListGroupItem>
    <ListGroupItem>
      Last updated date: {formatDateToString(new Date(JSON.parse(updatedDate)))}
    </ListGroupItem>
  </ListGroup>
);
