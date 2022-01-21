import {Patchers} from "../Patchers";

describe('PatchedObject.ts', function () {

	beforeEach(() => {
		Patchers.patch();
	});

	test('Patched object class', () => {
		const data = {hello : 'world'};

		expect(data._isEmpty).toBeDefined();
		expect({}._isEmpty()).toBeTruthy();
	});

	test('iterating object', () => {

		const data = {hello : 'world', key : 'Hi there.'};

		for (let dataKey in data) {
			expect(['hello', 'key'].includes(dataKey)).toBeTruthy();
		}
	});

	test('native object._exists()', () => {
		const data = {hello : 'world'};

		expect(data._exists).toBeDefined();
		expect(data._exists('hello')).toBeTruthy();
		expect(data._exists('goodbye')).toBeFalsy();
	});

	test('native object._has()', () => {
		const data = {hello : 'world', key : 'Hi there.'};
		// has(property: any, includePropertyChain?: boolean): boolean;
		expect(data._has).toBeDefined();
		expect(data._has('hello')).toBeTruthy();
		expect(data._has('missing')).toBeFalsy();
	});

	test('native object._put()', () => {
		const data = {hello : 'world', key : 'Hi there.'};
		// put(key: string, value: any);
		expect(data._put).toBeDefined();
		data._put('new', 'value');
		expect(data['new'] === 'value').toBeTruthy();
		expect(data['missing'] === 'value').toBeFalsy();
	});

	test('native object._get()', () => {
		const data = {hello : 'world', key : 'Hi there.', truthyValue : true};
		// get(key?: string, _default?: any);
		expect(data._get).toBeDefined();
		expect(data._get('truthyValue')).toBeTruthy();
		expect(data._get('missing', false)).toBeFalsy();
	});

	test('native object._only()', () => {
		const data = {hello : 'world', key : 'Hi there.'};
		// only(keys: string[]);
		expect(data._only).toBeDefined();
		expect(data._only(['hello'])).toEqual({hello : 'world'});
	});

	test('native object._except()', () => {
		const data = {hello : 'world', key : 'Hi there.'};
		// except(keys: string[]);
		expect(data._except).toBeDefined();
		const except = data._except(['key']);
		expect(except).toEqual({hello : 'world'});
	});

	test('native object._keys()', () => {
		const data = {hello : 'world', key : 'Hi there.'};
		// keys(): (string | number)[];
		expect(data._keys).toBeDefined();
		expect(data._keys()).toEqual(['hello', 'key']);
	});

	test('native object._forget()', () => {
		const data = {hello : 'world', key : 'Hi there.'};
		// forget<T>(key: string);
		expect(data._forget).toBeDefined();
		expect(data._forget('key')).toEqual({hello : 'world'});
		expect(data['key']).toBeUndefined();
	});

	test('native object._pull()', () => {
		const data = {hello : 'world', key : 'Hi there.'};
		// pull(key: string, _default?: any): any;
		expect(data._pull).toBeDefined();
		expect(data._pull('key')).toEqual('Hi there.');
		expect(data['key']).toBeUndefined();
	});

	test('native object._count()', () => {
		const data = {hello : 'world', key : 'Hi there.'};
		// count(): number;
		expect(data._count).toBeDefined();
		expect(data._count()).toEqual(2);
		expect(data._forget('key')._count()).toEqual(1);
	});

	test('native object._filter()', () => {
		const data = {hello : 'world', key : 'Hi there.'};
		// filter(filterMethod: (value, key?: any) => boolean);
		expect(data._filter).toBeDefined();
		const filtered = data._filter((value, key) => key === 'hello');
		expect(filtered['hello']).toBeDefined();
		expect(filtered['key']).toBeUndefined();
	});

	test('native object._map()', () => {
		const data = {hello : 'world', key : 'Hi there.'};
		// map(mapMethod: (value) => any);
		expect(data._map).toBeDefined();
		const mapped = data._map((value) => {
			return value + ' | Mapped';
		});
		expect(mapped['hello']).toEqual('world | Mapped');
		expect(mapped['key']).toEqual('Hi there. | Mapped');
		expect(data['hello']).toEqual('world');
		expect(data['key']).toEqual('Hi there.');
	});

	test('native object._keyBy()', () => {
		const data = {
			1 : {id : 1, name : 'Jeff'},
			2 : {id : 2, name : 'Bob'},
		};
		// keyBy(keyName: string);
		expect(data._keyBy).toBeDefined();

		const keyed = data._keyBy('name');

		expect(keyed.Bob.id).toEqual(2);
		expect(keyed.Jeff.id).toEqual(1);

	});

	test('native object._pluck()', () => {
		const data = {
			1 : {id : 1, name : 'Jeff'},
			2 : {id : 2, name : 'Bob'},
		};
		// pluck(keyName: string);
		expect(data._pluck).toBeDefined();
		const plucked = data._pluck('name');
		expect(plucked).toEqual(['Jeff', 'Bob']);
	});


});
