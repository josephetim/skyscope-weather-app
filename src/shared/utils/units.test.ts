import { celsiusToFahrenheit, formatTemperature, formatWindSpeed, getTemperatureForUnit } from '@/src/shared/utils/units';

describe('unit helpers', () => {
  it('converts Celsius to Fahrenheit correctly', () => {
    expect(celsiusToFahrenheit(25)).toBe(77);
    expect(getTemperatureForUnit(25, 'fahrenheit')).toBe(77);
  });

  it('formats temperatures and wind speed consistently', () => {
    expect(formatTemperature(21, 'celsius')).toBe('21°C');
    expect(formatTemperature(21, 'fahrenheit')).toBe('70°F');
    expect(formatWindSpeed(16.09, 'fahrenheit')).toBe('10 mph');
  });
});
