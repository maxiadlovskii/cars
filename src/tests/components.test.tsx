import { render } from '@testing-library/react';
import React from 'react';
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { CarItem, CarsFilter, CarsList } from '../components';

import { car, colors, manufacturers } from './moks';
import {routes} from "../constants/routes";

const history = createMemoryHistory()
const route = routes.carList
history.push(route)

test('Render CarItem', () => {
  const { container } = render(
      <Router history={history}>
        <CarItem
            {
              ...car
            }
        />
      </Router>
  );
  expect(container).toMatchSnapshot();
});

test('Render CarsFilter', () => {
  const { container } = render(
      <Router history={history}>
        <CarsFilter
            colors={colors}
            manufacturers={manufacturers}
            onChange={console.log}
            isFetching={false}
        />
      </Router>
  );
  expect(container).toMatchSnapshot();
});

test('Render CarsList', () => {
  const { container } = render(
      <Router history={history}>
        <CarsList />
      </Router>
  );
  expect(container).toMatchSnapshot();
});
