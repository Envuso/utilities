import {Patchers} from "../Patchers";

describe('PatchedArray.ts', function () {

	beforeEach(() => {
		Patchers.patch();
	});

	test('iterating', () => {
		const dataOne: any   = {hello : 'world', key : 'Hi there.'};
		const dataTwo: any   = ['hello', 'world'];
		const dataThree: any = 'hello world';

		const all = [dataOne, dataTwo, dataThree];

		all.forEach((dataStructure, index) => {
			for (let key in dataStructure) {
				if (index === 0) expect(['hello', 'key']).toContain(key);
				if (index === 1) expect(["0", "1"]).toContain(key);
				if (index === 2) expect(Number(key) >= 0 && Number(key) <= 11).toBeTruthy();
			}
			//Objects aren't iterable.
			if(index === 0) {
				return;
			}
			for (let key of dataStructure) {
				if (index === 1) expect(['hello', 'world']).toContain(key);
				if (index === 2) expect('hello world'.includes(key)).toBeTruthy();
			}
		});

	});

	test('native array.isEmpty method', () => {
		// isEmpty(): boolean
		const data = ['one', 'two'];

		expect(data.isEmpty).toBeDefined();
		expect([].isEmpty()).toBeTruthy();
		expect(data.isEmpty()).toBeFalsy();

	});

	test('native array.contains method', () => {
		// contains(item: any): boolean
		const data = ['one', 'two'];

		expect(data.contains).toBeDefined();
		expect(data.contains('one')).toBeTruthy();
		expect(data.contains('three')).toBeFalsy();

	});

	test('native array.has method', () => {
		// has(...items: any[]): boolean
		const data = ['one', 'two'];

		expect(data.has).toBeDefined();
		expect(data.has('one', 'two')).toBeTruthy();
		expect(data.has('three')).toBeFalsy();

	});

	test('native array.random method', () => {
		// random(): T
		const data = ['one', 'two'];

		expect(data.random).toBeDefined();
		expect(data.random()).toHaveLength(3);
		expect([].random()).toBeFalsy();

	});

	test('native array.first method', () => {
		// first(): T
		const data = ['one', 'two'];

		expect(data.first).toBeDefined();
		expect(data.first()).toEqual('one');

	});

	test('native array.last method', () => {
		// last(): T
		const data = ['one', 'two'];

		expect(data.last).toBeDefined();
		expect(data.last()).toEqual('two');

	});

});
