import {isPlural, isSingular, plural, singular} from "pluralize";
import {Str} from "../../Str";
import {PatchesNativeType, PatchInformation} from "../PatchesNativeType";
import {patch} from "../PatchMethod";


declare global {
	interface StringConstructor {
		random(length?: number): string;
	}

	interface String {

		/**
		 * Is our string empty? Has a length of 0.
		 *
		 * @returns {boolean}
		 */
		isEmpty(): boolean;

		/**
		 * Does our string contain any of the provided values?
		 *
		 * @param {string[]} values
		 * @returns {boolean}
		 */
		contains(...values: string[]): boolean;

		/**
		 * Capitalize the first character of the string
		 *
		 * @returns {string}
		 */
		capitalize(): string;

		/**
		 * Remove the provided string from our string
		 *
		 * @param {string} subStr
		 * @returns {string}
		 */
		remove(subStr: string): string;

		/**
		 * Returns the plural version of the specified string
		 * "(of a word or form) denoting more than one", for example "users" rather than "user"
		 *
		 * @returns {string}
		 */
		plural(): string;

		/**
		 * Checks if the provided string is plural
		 * "(of a word or form) denoting more than one", for example "users" rather than "user"
		 *
		 * @returns {string}
		 */
		isPlural(): boolean;

		/**
		 * Checks if the provided string is in singular form
		 * For example "user" rather than "users"
		 *
		 * @returns {string}
		 */
		isSingular(): boolean;

		/**
		 * Get the singular form of the provided string
		 * For example "user" rather than "users"
		 *
		 * @returns {string}
		 */
		singular(): string;

		strcasecmp(str): number;

	}

}

String.random = function (length: number = 10): string {
	return Str.random(length);
};

export class PatchedString extends String implements PatchesNativeType {

	constructor(value: string) {
		super();
	}

	/**
	 * Is our string empty? Has a length of 0.
	 *
	 * @returns {boolean}
	 */
	@patch()
	isEmpty(): boolean {
		return Str.isEmpty(this.valueOf());
	}

	/**
	 * Does our string contain any of the provided values?
	 *
	 * @param {string[]} values
	 * @returns {boolean}
	 */
	@patch()
	contains(...values: string[]) {
		for (let value of values) {
			if (this.includes(value)) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Capitalize the first character of the string
	 *
	 * @returns {string}
	 */
	@patch()
	capitalize(): string {
		return this.charAt(0).toUpperCase() + this.slice(1);
	}

	/**
	 * Remove the provided string from our string
	 *
	 * @param {string} subStr
	 * @returns {string}
	 */
	@patch()
	remove(subStr: string): string {
		return this.replace(subStr, '');
	}

	/**
	 * Returns the plural version of the specified string
	 * "(of a word or form) denoting more than one", for example "users" rather than "user"
	 *
	 * @returns {string}
	 */
	@patch()
	plural(): string {
		return plural(this.valueOf());
	}

	/**
	 * Checks if the provided string is plural
	 * "(of a word or form) denoting more than one", for example "users" rather than "user"
	 *
	 * @returns {string}
	 */
	@patch()
	isPlural(): boolean {
		return isPlural(this.valueOf());
	}

	/**
	 * Checks if the provided string is in singular form
	 * For example "user" rather than "users"
	 *
	 * @returns {string}
	 */
	@patch()
	isSingular(): boolean {
		return isSingular(this.valueOf());
	}

	/**
	 * Get the singular form of the provided string
	 * For example "user" rather than "users"
	 *
	 * @returns {string}
	 */
	@patch()
	singular() {
		return singular(this.valueOf());
	}

	/**
	 * Implementation of php's strcasecmp
	 * @param str
	 * @returns {number}
	 */
	@patch()
	strcasecmp(str): number {
		let lowerThis = this.toLowerCase();
		let lowerStr  = str.toLowerCase();
		return lowerThis > lowerStr ? 1 : (lowerThis < lowerStr ? -1 : 0);
	}

	_handleGet(property: string, args: IArguments): any {
		if (property === 'get' || property === 'count') {
			debugger;
		}
		const method = this[property].bind(this);
		const result = method(...args);

		return result;
	}

	_handleSet(property: string, value: any): any {
		this[property] = value;
	}

	_patchInformation(): PatchInformation {
		return {
			target         : String.prototype,
			baseDescriptor : {
				enumerable   : false,
				configurable : true,
			}
		};
	}
}
