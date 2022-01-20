import _ from "lodash";
import {PatchesNativeType, PatchInformation} from "../PatchesNativeType";
import Obj from "../../Obj";
import {patch} from "../PatchMethod";

declare global {
	interface ObjectConstructor {
		new(value?: any): Object;

		(): any;

		(value: any): any;
	}

	interface Object {
		isEmpty(): boolean;

		/**
		 * Check if a property exists on an object.
		 *
		 * Contributed by https://github.com/Tecnology73
		 * Commit was lost during mono-repo merge :(
		 */
		has(property: any, includePropertyChain?: boolean): boolean;

		/**
		 * Check if a key exists on an object
		 * This won't check the prototype chain etc.
		 * This is strictly (obj[property] !== undefined)
		 * @param property
		 * @returns {boolean}
		 */
		exists(property: any): boolean;

		/**
		 * Put a new key->value into the object
		 *
		 * @param {string} key
		 * @param value
		 */
		put(key: string, value: any);

		/**
		 * Get an item from the object, if it doesn't exist, return _default
		 *
		 * @param {string} key
		 * @param _default
		 */
		get(key?: string, _default?: any);

		/**
		 * Return a new object containing only the specified keys
		 *
		 * @param {string[]} keys
		 */
		only(keys: string[]);

		/**
		 * Return a new object without the items specified by the keys
		 *
		 * @see {Object.prototype.except}
		 *
		 * @param {string[]} keys
		 */
		except(keys: string[]);

		/**
		 * Get the keys from the object
		 *
		 * @return {(string | number)[]}
		 */
		keys(): (string | number)[];

		/**
		 * Remove an item from the object and return the updated object
		 *
		 * @param {string} key
		 */
		forget(key: string);

		/**
		 * Get an item from the object, remove it, then return the item & the updated array
		 *
		 * @param {string} key
		 * @param _default
		 */
		pull(key: string, _default?: any): any;

		/**
		 * Return the count of the keys in the object
		 *
		 * @return {number}
		 */
		count(): number;

		/**
		 * Creates a new object with all elements that pass the test implemented by the provided function.
		 *
		 * Example:
		 * {one : 1, two : 2}.filter(value => value === 1);
		 * returns {one : 1}
		 *
		 * @param {(value, key?: any) => boolean} filterMethod
		 */
		filter(filterMethod: (value, key?: any) => boolean);

		map(mapMethod: (value) => any);

		keyBy(keyName: string);

		pluck(keyName: string);
	}
}

export default class PatchedObject extends Object implements PatchesNativeType {

	constructor(value?: any) {
		super(value);
	}

	@patch()
	isEmpty(): boolean {
		return Obj.isEmpty(this);
	}

	@patch()
	exists(property: any): boolean {
		return Obj.exists(this, property);
	}

	@patch()
	has(property: any, includePropertyChain: boolean = false): boolean {
		return Obj.has(this, property, includePropertyChain);
	}

	@patch()
	put(key: string, value: any) {
		this[key] = value;

		return this;
	}

	@patch()
	get(key?: string, _default: any = null) {
		if (key === undefined) {
			return (this === undefined ? _default : this);
		}
		return _.get(this, key) ?? _default;
	}

	@patch()
	only(keys: string[]) {
		const newObj = Object.create(this);

		return _.pick(newObj, keys);
	}

	@patch()
	except(keys: string[]) {
		const values: any = {};

		for (let key of Object.keys(this)) {
			if (keys.includes(key)) {
				continue;
			}

			values[key] = this[key];
		}

		return values;
	}

	@patch()
	keys(): string[] {
		return Object.keys(this);
	}

	@patch()
	forget(key: string) {
		if (!this.has(key)) {
			return this;
		}

		_.unset(this, key);

		return this;
	}

	@patch()
	pull(key: string, _default: any = null): any {
		const value = this.get(key) ?? _default;

		this.forget(key);

		return value;
	}

	@patch()
	count(): number {
		return Object.keys(this).length;
	}

	@patch()
	filter(filterMethod: (value, key?: any) => boolean) {
		const filteredObj: any = {};

		for (let key in this) {
			if (!filterMethod(this[key], key)) {
				continue;
			}

			filteredObj[key] = this[key];
		}

		return filteredObj;
	}

	@patch()
	map(mapMethod: (value) => any) {
		const newObj = _.toPlainObject(this);

		for (let key in newObj) {
			newObj[key] = mapMethod(newObj[key]);
		}

		return newObj;
	}

	@patch()
	keyBy(keyName: string) {
		return _.keyBy(this, keyName);
	}

	@patch()
	pluck(keyName: string) {
		const result = [];

		Object.values(this).forEach(value => {
			result.push(_.get(value, keyName));
		});

		return result;
	}


	_handleGet(property: string, args: IArguments): any {

		const method = this[property].bind(this);
		const result = method(...args);

		return result;
	}

	_handleSet(property: string, value: any): any {

		this[property] = value;
	}

	_patchInformation(): PatchInformation {
		return {
			target         : Object.prototype,
			baseDescriptor : {
				enumerable   : false,
				configurable : true,
			}
		};
	}
}
