import {Arr} from "../../Arr";
import {Maths} from "../../Maths";
import {PatchesNativeType, PatchInformation} from "../PatchesNativeType";
import {patch} from "../PatchMethod";

declare global {
	/**
	 * @template T
	 */
	interface Array<T> {

		/**
		 * Is our array empty?
		 * Has a length of 0.
		 *
		 * @returns {boolean}
		 */
		isEmpty(): boolean;

		/**
		 * Does our array contain the item?
		 * Basically the same as [].includes(val);
		 *
		 * @param item
		 * @returns {boolean}
		 */
		contains(item: any): boolean;

		/**
		 * Does our array contain the specified item?
		 * Returns false if one of the provided items is not in the array, true if they all exist.
		 *
		 * @param items
		 * @returns {boolean}
		 */
		has(...items: any[]): boolean;

		/**
		 * Get a random value from our array
		 *
		 * @returns {T}
		 */
		random(): T;

		/**
		 * Get the first item from our array
		 *
		 * @returns {T}
		 */
		first(): T;

		/**
		 * Get the last item from our array
		 *
		 * @returns {T}
		 */
		last(): T;
	}
}

/**
 * @template T
 */
export default class PatchedArray extends Array implements PatchesNativeType {

	constructor(value?: any) {
		super(value);
	}

	/**
	 * Is our array empty?
	 * Has a length of 0.
	 *
	 * @returns {boolean}
	 */
	@patch()
	isEmpty(): boolean {
		return this.length === 0;
	}

	/**
	 * Does our array contain the item?
	 * Basically the same as [].includes(val);
	 *
	 * @param item
	 * @returns {boolean}
	 */
	@patch()
	contains(item: any): boolean {
		return Arr.contains(this, item);
	}

	/**
	 * Does our array contain the specified item?
	 * Returns false if one of the provided items is not in the array, true if they all exist.
	 *
	 * @param items
	 * @returns {boolean}
	 */
	@patch()
	has(...items: any[]): boolean {
		return Arr.has(this, ...items);
	}

	/**
	 * Get a random value from our array
	 *
	 * @returns {T}
	 */
	@patch()
	random() {
		return this[Maths.randomInt(0, this.length - 1)];
	}

	/**
	 * Get the first item from our array
	 *
	 * @returns {T}
	 */
	@patch()
	first<T>(): T {
		return Arr.first<T>(this);
	}

	/**
	 * Get the last item from our array
	 *
	 * @returns {T}
	 */
	@patch()
	last<T>(): T {
		return Arr.last<T>(this);
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
			target         : Array.prototype,
			baseDescriptor : {
				enumerable   : false,
				configurable : true,
			}
		};
	}
}
