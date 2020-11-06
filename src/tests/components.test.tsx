import { render } from '@testing-library/react';
import React from 'react';

import { CarItem, CarsFilter, CarsList } from '../components';

import { car, colors, manufacturers } from './moks';

test('Render CarItem', () => {
  const { container } = render(
    <CarItem
        {
          ...car
        }
    />
  );
  expect(container).toMatchSnapshot();
});

test('Render CarsFilter', () => {
  const { container } = render(
      <CarsFilter
          colors={colors}
          manufacturers={manufacturers}
          onChange={console.log}
          isFetching={false}
      />
  );
  expect(container).toMatchSnapshot();
});

test('Render CarsList', () => {
  const { container } = render(
      <CarsList />
  );
  expect(container).toMatchSnapshot();
});
