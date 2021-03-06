/***************************************************************************************************************************************************************
 *
 * progress.js unit tests
 *
 * @file - src/progress.js
 *
 * Tested methods:
 * Progress
 *
 **************************************************************************************************************************************************************/


import { Progress } from '../../src/progress';
import Size from 'window-size';


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Progress
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
let amount = 100;
test('Progress.set - Set the amount correctly', () => {
	Progress.set( amount );

	expect( Progress.todo ).toBe( amount );
});


test('Progress.tick - Tick increases the amount correctly', () => {
	process.stdout.write = jest.fn();

	Progress.tick();

	expect( Progress.done ).toBe( 1 );
});


test('Progress.display - Tick increases the amount correctly', () => {
	process.stdout.write = jest.fn();

	Progress.display();

	if( Size !== undefined ) {
		if( Size.width > 18 ) {
			expect( process.stdout.write.mock.calls.length ).toBe( 2 );
			expect( process.stdout.write.mock.calls[0][0] ).toBe(`\r\x1b[K`);
		}
		else {
			expect( process.stdout.write.mock.calls.length ).toBe( 0 );
		}
	}
	else {
		expect( true ).toBe( true );
	}
});


test('Progress.tick - Last tick clears the display', () => {
	process.stdout.write = jest.fn();

	Progress.done = amount - 1;

	Progress.tick( 30 );

	expect( process.stdout.write.mock.calls.length ).toBe( 3 );
	expect( process.stdout.write.mock.calls[0][0] ).toBe(`\r\x1b[K`);
	expect( process.stdout.write.mock.calls[2][0] ).toBe(`\r\x1b[K`);
});


test('Progress.display - display nothing if there is not enough space', () => {
	process.stdout.write = jest.fn();

	Progress.display( 10 );

	expect( process.stdout.write.mock.calls.length ).toBe( 0 );
});


test('Progress.clear - clears the output correctly', () => {
	process.stdout.write = jest.fn();

	Progress.clear();

	expect( process.stdout.write.mock.calls.length ).toBe( 1 );
	expect( process.stdout.write.mock.calls[0][0] ).toBe(`\r\x1b[K`);
});
