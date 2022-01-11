
type Constructor<T = {}> = new (...args: any[]) => T;

export class Classes {

	public static getOrInstantiate<T>(c: any, ...args): T {
		return this.isInstantiated(c) ? c : new c(...args);
	}

	/**
	 * Check if a class has been instantiated
	 *
	 * @param c
	 * @returns {boolean}
	 */
	public static isInstantiated(c: any): boolean {
		return (typeof c.prototype === "undefined");
	}

	/**
	 * Hacky dirty way to check if our class extends another specific class
	 * without referencing it or using instanceof checks
	 *
	 * @param classInstance
	 * @param {string} name
	 * @param {number} maxLookLevels
	 * @returns {boolean}
	 */
	public static checkIfExtends(classInstance: any, name: string, maxLookLevels: number = 3) {
		const levels = [
			classInstance.__proto__
		];

		for (let i = 0; i < maxLookLevels; i++) {
			levels.push(levels[i]?.__proto__);

			if (!levels[i]) {
				continue;
			}

			if (levels[i]?.name === name) {
				return true;
			}
		}

		return false;
	}

	/**
	 * If a class has been instantiated, get the underlying constructor
	 * Otherwise, return the constructor
	 *
	 * @param c
	 * @returns {boolean}
	 */
	public static getConstructor<T>(c: any): new () => T {
		if (this.isInstantiated(c)) {
			return c.constructor;
		}

		return c;
	}

	/**
	 * Get the constructor name from the constructor
	 *
	 * Returns null if not a constructor
	 *
	 * @param c
	 * @returns {string | null}
	 */
	public static getConstructorName(c: any): string | null {
		return this.getConstructor(c)?.name ?? null;
	}

}
