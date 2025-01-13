/* eslint-disable no-undef */
import { eventBus } from '../GameScripts/EventBus';


describe('BombGenerator', () => {

  test('returns a set with size 10', () => {
    const result = eventBus.emit('GenerateBombs', { max: 50, amount: 10 });
    expect(result.size).toBe(10);
  });

  test('returns empty set if max < amount', () => {
    const result = eventBus.emit('GenerateBombs', { max: 10, amount: 50 });
    expect(result.size).toBe(0);
  });

})
  
 