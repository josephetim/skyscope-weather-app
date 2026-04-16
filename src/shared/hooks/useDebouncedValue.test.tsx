import { useState } from 'react';
import { Button, Text, View } from 'react-native';

import { act, fireEvent, render } from '@testing-library/react-native';

import { useDebouncedValue } from '@/src/shared/hooks/useDebouncedValue';

function DebounceHarness() {
  const [value, setValue] = useState('');
  const debouncedValue = useDebouncedValue(value, 300);

  return (
    <View>
      <Button onPress={() => setValue('first')} title="First" />
      <Button onPress={() => setValue('second')} title="Second" />
      <Text testID="debounced-value">{debouncedValue}</Text>
    </View>
  );
}

describe('useDebouncedValue', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('updates only after the debounce delay', () => {
    const screen = render(<DebounceHarness />);

    fireEvent.press(screen.getByText('First'));
    fireEvent.press(screen.getByText('Second'));

    expect(screen.getByTestId('debounced-value').props.children).toBe('');

    act(() => {
      jest.advanceTimersByTime(299);
    });

    expect(screen.getByTestId('debounced-value').props.children).toBe('');

    act(() => {
      jest.advanceTimersByTime(1);
    });

    expect(screen.getByTestId('debounced-value').props.children).toBe('second');
  });
});
