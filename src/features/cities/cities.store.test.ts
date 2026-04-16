import { addFavoriteId, removeFavoriteId } from '@/src/features/cities/cities.store';

describe('favorite helpers', () => {
  it('does not duplicate a favorite city id', () => {
    expect(addFavoriteId(['lagos'], 'lagos')).toEqual(['lagos']);
  });

  it('removes a favorite city id cleanly', () => {
    expect(removeFavoriteId(['lagos', 'london'], 'lagos')).toEqual(['london']);
  });
});
