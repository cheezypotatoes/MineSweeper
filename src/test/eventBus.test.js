/* eslint-disable no-undef */
import { eventBus } from '../GameScripts/EventBus/EventBus';
import { MineSweeper } from '../GameScripts/Game';


describe('BombGenerator', () => {

  test('returns a set with size 10', () => {
    MineSweeper.setHeightWidth({height: 10, width: 5});
    const result = eventBus.emit('GenerateBombs', { amount: 10 });
    expect(result.size).toBe(10);
  });

  test('returns empty set if max < amount', () => {
    MineSweeper.setHeightWidth({height: 2, width: 5});
    const result = eventBus.emit('GenerateBombs', { amount: 50 });
    expect(result.size).toBe(0);
  });

  test('test if returns 10', () => {
    MineSweeper.setHeightWidth({height: 9, width: 9});
    const result = eventBus.emit('GenerateBombs', { amount: 10 });
    expect(result.size).toBe(10);
  });

  test('test if returns 2', () => {
    MineSweeper.setHeightWidth({height: 3, width: 3});
    const result = eventBus.emit('GenerateBombs', { amount: 2 });
    expect(result.size).toBe(2);
  });

})
 