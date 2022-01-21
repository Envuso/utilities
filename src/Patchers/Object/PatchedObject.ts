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
		_isEmpty(): boolean;

		/**
		 * Check if a property exists on an object.
		 *
		 * Contributed by https://github.com/Tecnology73
		 * Commit was lost during mono-repo merge :(
		 */
		_has(property: any, includePropertyChain?: boolean): boolean;

		/**
		 * Check if a key exists on an object
		 * This won't check the prototype chain etc.
		 * This is strictly (obj[property] !== undefined)
		 * @param property
		 * @returns {boolean}
		 */
		_exists(property: any): boolean;

		/**
		 * Put a new key->value into the object
		 *
		 * @param {string} key
		 * @param value
		 */
		_put(key: string, value: any);

		/**
		 * Get an item from the object, if it doesn't exist, return _default
		 *
		 * @param {string} key
		 * @param _default
		 */
		_get(key?: string, _default?: any);

		/**
		 * Return a new object containing only the specified keys
		 *
		 * @param {string[]} keys
		 */
		_only(keys: string[]);

		/**
		 * Return a new object without the items specified by the keys
		 *
		 * @see {Object.prototype.except}
		 *
		 * @param {string[]} keys
		 */
		_except(keys: string[]);

		/**
		 * Get the keys from the object
		 *
		 * @return {(string | number)[]}
		 */
		_keys(): (string | number)[];

		/**
		 * Remove an item from the object and return the updated object
		 *
		 * @param {string} key
		 */
		_forget(key: string);

		/**
		 * Get an item from the object, remove it, then return the item & the updated array
		 *
		 * @param {string} key
		 * @param _default
		 */
		_pull(key: string, _default?: any): any;

		/**
		 * Return the count of the keys in the object
		 *
		 * @return {number}
		 */
		_count(): number;

		/**
		 * Creates a new object with all elements that pass the test implemented by the provided function.
		 *
		 * Example:
		 * {one : 1, two : 2}.filter(value => value === 1);
		 * returns {one : 1}
		 *
		 * @param {(value, key?: any) => boolean} filterMethod
		 */
		_filter(filterMethod: (value, key?: any) => boolean);

		_map(mapMethod: (value) => any);

		_keyBy(keyName: string);

		_pluck(keyName: string);
	}
}

export default class PatchedObject extends Object implements PatchesNativeType {

	constructor(value?: any) {
		super(value);
	}

	@patch()
	_isEmpty(): boolean {
		return Obj.isEmpty(this);
	}

	@patch()
	_exists(property: any): boolean {
		return Obj.exists(this, property);
	}

	@patch()
	_has(property: any, includePropertyChain: boolean = false): boolean {
		return Obj.has(this, property, includePropertyChain);
	}

	@patch()
	_put(key: string, value: any) {
		this[key] = value;

		return this;
	}

	@patch()
	_get(key?: string, _default: any = null) {
		if (key === undefined) {
			return (this === undefined ? _default : this);
		}
		return _.get(this, key) ?? _default;
	}

	@patch()
	_only(keys: string[]) {
		const newObj = Object.create(this);

		return _.pick(newObj, keys);
	}

	@patch()
	_except(keys: string[]) {
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
	_keys(): string[] {
		return Object.keys(this);
	}

	@patch()
	_forget(key: string) {
		if (!this._has(key)) {
			return this;
		}

		_.unset(this, key);

		return this;
	}

	@patch()
	_pull(key: string, _default: any = null): any {
		const value = this._get(key) ?? _default;

		this._forget(key);

		return value;
	}

	@patch()
	_count(): number {
		return Object.keys(this).length;
	}

	@patch()
	_filter(filterMethod: (value, key?: any) => boolean) {
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
	_map(mapMethod: (value) => any) {
		const newObj = _.toPlainObject(this);

		for (let key in newObj) {
			newObj[key] = mapMethod(newObj[key]);
		}

		return newObj;
	}

	@patch()
	_keyBy(keyName: string) {
		return _.keyBy(this, keyName);
	}

	@patch()
	_pluck(keyName: string) {
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
