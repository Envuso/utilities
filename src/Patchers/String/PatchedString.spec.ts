import {Patchers} from "../Patchers";

describe('PatchedString.ts', function () {

	beforeEach(() => {
		Patchers.patch();
	});

	test('Patched string class', () => {
		const data = "hi there.";

		expect(data.isEmpty).toBeDefined();
		expect("".isEmpty()).toBeTruthy();
	});

	test('native string.contains', () => {
		//contains(values: string[]): boolean;
		const data = 'Hi there.';

		expect(data.contains).toBeDefined();
		expect(data.contains('Hi', 'there')).toBeTruthy();
		expect(data.contains('nope')).toBeFalsy();

	});

	test('native string.capitalize', () => {
		//capitalize(): string;
		const data = 'hi';

		expect(data.capitalize).toBeDefined();
		expect(data.capitalize()).toEqual('Hi');
	})

	test('native string.remove', () => {
		//remove(subStr: string): string;
		const data = 'Hi there.';

		expect(data.remove).toBeDefined();
		expect(data.remove('there.')).toEqual('Hi ');
	})

	test('native string.plural', () => {
		//plural(): string;
		const data = 'user';

		expect(data.plural).toBeDefined();
		expect(data.plural()).toEqual('users');
	})

	test('native string.isPlural', () => {
		//isPlural(): boolean;

		expect(''.isPlural).toBeDefined();
		expect('users'.isPlural()).toBeTruthy();
		expect('user'.isPlural()).toBeFalsy();
	})

	test('native string.isSingular', () => {
		//isSingular(): boolean;

		expect(''.isSingular).toBeDefined();
		expect('user'.isSingular()).toBeTruthy();
		expect('users'.isSingular()).toBeFalsy();
	})

	test('native string.singular', () => {
		//singular(): string;
		expect(''.singular).toBeDefined();
		expect('user'.singular()).toEqual('user');
		expect('users'.singular()).toEqual('user');
	})
});
