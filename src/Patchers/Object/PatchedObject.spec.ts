import {Patchers} from "../Patchers";

describe('PatchedObject.ts', function () {

	beforeEach(() => {
		Patchers.patch();
	});

	test('Patched object class', () => {
		const data = {hello : 'world'};

		expect(data.isEmpty).toBeDefined();
		expect({}.isEmpty()).toBeTruthy();
	});

	test('iterating object', () => {

		const data = {hello : 'world', key : 'Hi there.'};

		for (let dataKey in data) {
			expect(['hello', 'key'].includes(dataKey)).toBeTruthy();
		}
	});

	test('native object.exists()', () => {
		const data = {hello : 'world'};

		expect(data.exists).toBeDefined();
		expect(data.exists('hello')).toBeTruthy();
		expect(data.exists('goodbye')).toBeFalsy();
	});

	test('native object.has()', () => {
		const data = {hello : 'world', key : 'Hi there.'};
		// has(property: any, includePropertyChain?: boolean): boolean;
		expect(data.has).toBeDefined();
		expect(data.has('hello')).toBeTruthy();
		expect(data.has('missing')).toBeFalsy();
	});

	test('native object.put()', () => {
		const data = {hello : 'world', key : 'Hi there.'};
		// put(key: string, value: any);
		expect(data.put).toBeDefined();
		data.put('new', 'value');
		expect(data['new'] === 'value').toBeTruthy();
		expect(data['missing'] === 'value').toBeFalsy();
	});

	test('native object.get()', () => {
		const data = {hello : 'world', key : 'Hi there.', truthyValue : true};
		// get(key?: string, _default?: any);
		expect(data.get).toBeDefined();
		expect(data.get('truthyValue')).toBeTruthy();
		expect(data.get('missing', false)).toBeFalsy();
	});

	test('native object.only()', () => {
		const data = {hello : 'world', key : 'Hi there.'};
		// only(keys: string[]);
		expect(data.only).toBeDefined();
		expect(data.only(['hello'])).toEqual({hello : 'world'});
	});

	test('native object.except()', () => {
		const data = {hello : 'world', key : 'Hi there.'};
		// except(keys: string[]);
		expect(data.except).toBeDefined();
		const except = data.except(['key']);
		expect(except).toEqual({hello : 'world'});
	});

	test('native object.keys()', () => {
		const data = {hello : 'world', key : 'Hi there.'};
		// keys(): (string | number)[];
		expect(data.keys).toBeDefined();
		expect(data.keys()).toEqual(['hello', 'key']);
	});

	test('native object.forget()', () => {
		const data = {hello : 'world', key : 'Hi there.'};
		// forget<T>(key: string);
		expect(data.forget).toBeDefined();
		expect(data.forget('key')).toEqual({hello : 'world'});
		expect(data['key']).toBeUndefined();
	});

	test('native object.pull()', () => {
		const data = {hello : 'world', key : 'Hi there.'};
		// pull(key: string, _default?: any): any;
		expect(data.pull).toBeDefined();
		expect(data.pull('key')).toEqual('Hi there.');
		expect(data['key']).toBeUndefined();
	});

	test('native object.count()', () => {
		const data = {hello : 'world', key : 'Hi there.'};
		// count(): number;
		expect(data.count).toBeDefined();
		expect(data.count()).toEqual(2);
		expect(data.forget('key').count()).toEqual(1);
	});

	test('native object.filter()', () => {
		const data = {hello : 'world', key : 'Hi there.'};
		// filter(filterMethod: (value, key?: any) => boolean);
		expect(data.filter).toBeDefined();
		const filtered = data.filter((value, key) => key === 'hello');
		expect(filtered['hello']).toBeDefined();
		expect(filtered['key']).toBeUndefined();
	});

	test('native object.map()', () => {
		const data = {hello : 'world', key : 'Hi there.'};
		// map(mapMethod: (value) => any);
		expect(data.map).toBeDefined();
		const mapped = data.map((value) => {
			return value + ' | Mapped';
		});
		expect(mapped['hello']).toEqual('world | Mapped');
		expect(mapped['key']).toEqual('Hi there. | Mapped');
		expect(data['hello']).toEqual('world');
		expect(data['key']).toEqual('Hi there.');
	});

	test('native object.keyBy()', () => {
		const data = {
			1 : {id : 1, name : 'Jeff'},
			2 : {id : 2, name : 'Bob'},
		};
		// keyBy(keyName: string);
		expect(data.keyBy).toBeDefined();

		const keyed = data.keyBy('name');

		expect(keyed.Bob.id).toEqual(2);
		expect(keyed.Jeff.id).toEqual(1);

	});

	test('native object.pluck()', () => {
		const data = {
			1 : {id : 1, name : 'Jeff'},
			2 : {id : 2, name : 'Bob'},
		};
		// pluck(keyName: string);
		expect(data.pluck).toBeDefined();
		const plucked = data.pluck('name');
		expect(plucked).toEqual(['Jeff', 'Bob']);
	});


});
