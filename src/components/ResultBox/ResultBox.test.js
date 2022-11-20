import { render, screen, cleanup } from '@testing-library/react';
import ResultBox from './ResultBox';
import '@testing-library/jest-dom/extend-expect';
import { formatAmountInCurrency } from '../../utils/formatAmountInCurrency';

describe('Component ResultBox', () => {

  const testCases = [
    { amount: 100 },
    { amount: 250 },
    { amount: 148 },
    { amount: 350 },
    ];

    const testNegativeCases = [
      { amount: -100, from: 'PLN', to: 'USD' },
      { amount: -250, from: 'PLN', to: 'PLN' },
      { amount: -148, from: 'USD', to: 'PLN' },
      { amount: -350, from: 'USD', to: 'USD' },
    ]

  it('should render without crashing', () => {
    render(<ResultBox from='PLN' to='USD' amount={100} />);
  });

  it('should render proper info about conversion when PLN -> USD', () => {
    for(const testObj of testCases) {
    render(<ResultBox from='PLN' to='USD' amount={testObj.amount} />);
    const output = screen.getByTestId('output');
    expect(output).toHaveTextContent(`${formatAmountInCurrency(testObj.amount, 'PLN')} = ${formatAmountInCurrency((testObj.amount / 3.5), 'USD')}`);
    cleanup()
    }
  });

  it('should render proper info about conversion when USD -> PLN', () => {
    for(const testObj of testCases) {
    render(<ResultBox from='USD' to='PLN' amount={testObj.amount} />);
    const output = screen.getByTestId('output');
    expect(output).toHaveTextContent(`${formatAmountInCurrency(testObj.amount, 'USD')} = ${formatAmountInCurrency((testObj.amount * 3.5), 'PLN')}`);
    cleanup()
    }
  });
  it('should render equal values when PLN -> PLN', () => {
    for(const testObj of testCases) {
    render(<ResultBox from='PLN' to='PLN' amount={testObj.amount} />);
    const output = screen.getByTestId('output');
    expect(output).toHaveTextContent(`${formatAmountInCurrency(testObj.amount, 'PLN')} = ${formatAmountInCurrency((testObj.amount), 'PLN')}`);
    cleanup()
    }
  });
  it('should render equal values when USD -> USD', () => {
    for(const testObj of testCases) {
    render(<ResultBox from='USD' to='USD' amount={testObj.amount} />);
    const output = screen.getByTestId('output');
    expect(output).toHaveTextContent(`${formatAmountInCurrency(testObj.amount, 'USD')} = ${formatAmountInCurrency((testObj.amount), 'USD')}`);
    cleanup()
    }
  });
  it('should render WRONG VALUE when amount < 0', () => {
    for(const testObj of testNegativeCases) {
    render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />);
    const output = screen.getByTestId('output');
    expect(output).toHaveTextContent('WRONG VALUE!');
    cleanup()
    }
  });
});

