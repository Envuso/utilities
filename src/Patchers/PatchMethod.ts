import {Classes} from "../Classes";
import type {PatchesNativeType} from "./PatchesNativeType";

export const patchStore: {
	[key: string]: {
		target: Function & { ___patcher?: any },
		descriptor: PropertyDescriptor,
		methods: string[];
		patcher: PatchesNativeType;
		wasPatched?: boolean
	}
} = {};

export function patch() {
	return function (target: PatchesNativeType, property: string, descriptor: PropertyDescriptor) {
		const name      = Classes.getConstructorName(target);
		const patchInfo = target._patchInformation();

		if (!patchStore[name]) {
			patchStore[name] = {
				target     : patchInfo.target,
				descriptor : patchInfo.baseDescriptor,
				methods    : [],
				patcher    : target,
				wasPatched : false,
			};
		}

		patchStore[name].methods.push(property);
	};
}
