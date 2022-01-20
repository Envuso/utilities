import {isPlural, isSingular, plural, singular} from "pluralize";
import Obj from "./Obj";
import SimpleCrypto from "./SimpleCryptoJS";


export class Str {

	/**
	 * Uses math.random() to get a quick and dirty random string
	 * Lot's quicker but cannot guarantee it's unique in the moment.
	 *
	 * Quick perf test; 1000 iterations of 100 char string in 0.46-0.47ms
	 *
	 * @param length
	 */
	static random(length = 10): string {
		const getRandom = () => Math.random().toString(20).substr(2, length);

		let currentStr = getRandom();

		if (currentStr.length <= length) {
			return currentStr.slice(0, length);
		}

		while (currentStr.length < length) {
			currentStr += getRandom();
		}

		return currentStr.slice(0, length);
	}

	/**
	 * Uses node.js crypto module to give a more unique random string
	 *
	 * Quick perf test; 1000 iterations of 100 char string in 8.93-9.23ms
	 *
	 * @param length
	 */
	static uniqueRandom(length = 10) {
		return require('crypto').randomBytes(Math.ceil(length / 2))
			.toString('hex')
			.substr(0, length);
	}

	/**
	 * Contributed by https://github.com/Tecnology73
	 * Commit was lost during mono-repo merge :(
	 */
	static isEmpty(value: any): boolean {
		return (Obj.isNullOrUndefined(value) || String(value).trim().length === 0);
	}

	static randomWords(amount: number): string[] {
		return SimpleCrypto.generateRandomWordArray(amount).words.map(w => w.toString());
	}
}



String.random = function (length: number = 10): string {
	return Str.random(length);
};
