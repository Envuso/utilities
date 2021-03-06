import _ from 'lodash';
import {ConfigFile} from "./ConfigurationFile";

export class ConfigRepository {

	/**
	 * All of the Config loaded into the repository
	 *
	 * @private
	 */
	public static _config: any;

	private static pendingConfigurationFiles = [];

	/**
	 * Load all available Configuration
	 *
	 * We'll pass the config in here via the object that is registered in the apps boot
	 * process. Previously it tried to import the file from the path path specified,
	 * this didn't work when compiled because it was /src/ not /dist/
	 *
	 * @private
	 */
	public static loadConfigFrom(configFiles: ConfigFile[]) {
		const configObject = {};

		for (let configFile of configFiles) {
			configObject[configFile.name.toLowerCase()] = configFile.resolved;
		}

		this._config = configObject;
	}

	/**
	 * Get a Config value by key
	 *
	 * @param key
	 * @param _default
	 */
	public static get<T extends string, R extends any>(key: T, _default: any = null): R {
		if (key.includes('.')) {
			const parts = key.split('.');
			parts[0]    = parts[0].toString().toLowerCase();

			key = parts.join('.') as T;
		} else {
			key = key.toLowerCase() as T;
		}

		return _.get(this._config, key) ?? _default;
	}

	/**
	 * Get a config file
	 *
	 * @param {T} file
	 * @param _default
	 * @return {typeof Config[T]}
	 */
	public static file<T extends string, R extends any>(file: T, _default: any = null): R {
		return this._config[file.toLowerCase()] ?? _default;
	};

	/**
	 * Set a Config on the repository
	 *
	 * @param key
	 * @param value
	 */
	public static set(key: string, value: any) {
		_.set(this._config, key, value);
	}

	/**
	 * If the target is an array, then we'll push it to the array
	 *
	 * @param key
	 * @param value
	 */
	public static put(key: string, value: any) {
		//@ts-ignore
		const current = this.get(key);

		if (!current) {
			this.set(key, [value]);

			return;
		}

		if (!(Array.isArray(current))) {
			throw new Error('ConfigRepository: Target ' + key + ' is not an array');
		}

		current.push(value);

		this.set(key, current);
	}

	/**
	 * Does a key exist in the Config?
	 *
	 * @param key
	 */
	public static has(key: string): boolean {
		return _.has(this._config, key);
	}

	public static reset() {
		this._config = {};
	}


}
