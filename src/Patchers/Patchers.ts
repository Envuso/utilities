import {Classes} from "../Classes";
import PatchedArray from "./Array/PatchedArray";
import PatchedObject from "./Object/PatchedObject";
import {PatchesNativeType} from "./PatchesNativeType";
import {patchStore} from "./PatchMethod";
import {PatchedString} from "./String/PatchedString";

export type PatchedMetadata = {
	patcher: PatchesNativeType,
	methods: string[]
}

export class Patchers {

	public static classes: (new (...args: any[]) => PatchesNativeType)[] = [
		PatchedObject,
		PatchedString,
		PatchedArray,
	];

	public static patch() {
		for (let patcherClass of this.classes) {
			const className = Classes.getConstructorName(patcherClass);
			const patchInfo = patchStore[className];

			if (patchInfo.wasPatched) {
				console.warn(`Skipping native patcher ${className}. Already marked as patched.`);
				continue;
			}

			for (let method of patchInfo.methods) {

				Object.defineProperty(patchInfo.target, method, {
					enumerable   : false,
					configurable : true,
					get() {
						const t = this;
						return function () {
							return patchInfo.patcher[method].call(this, ...arguments);
						};
					},
					set(v: any) {
						this[method] = v;
					}
				});

			}

			console.log('Patched methods for ' + className);
		}
	}

}
