/* eslint-disable no-undef */
import { eventBus } from '../GameScripts/EventBus';


describe('BombGenerator', () => {

  test('returns a set with size 10', () => {
    const result = eventBus.emit('GenerateBombs', { max: 50, amount: 10 });
    expect(result.size).toBe(10);
  });

})
  
 