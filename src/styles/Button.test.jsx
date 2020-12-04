import React from 'react';

import { MemoryRouter } from 'react-router-dom';

import { render } from '@testing-library/react';

import Button from './Button';

describe('Button', () => {
  const renderButton = ({ to, warn }) => render((
    <MemoryRouter>
      <Button
        warn={warn}
        to={to}
      >
        button
      </Button>
    </MemoryRouter>
  ));

  context('with to, link', () => {
    const to = '/login';
    it('renders tags name', () => {
      const { getByText } = renderButton({ to, warn: null });

      expect(getByText('button').href).toBe('http://localhost/login');
    });

    it('check props true to be 1', () => {
      const { getByText } = renderButton({ to, warn: true });

      expect(getByText('button')).toHaveStyle('color: white;');
    });
  });

  context('without to', () => {
    it('nothing renders tags name', () => {
      const { getByText } = renderButton({});

      expect(getByText('button').href).not.toBe('http://localhost/login');
    });
  });
});
