export type PatchInformation = {
	target: any;
	baseDescriptor: PropertyDescriptor;
}

export interface PatchesNativeType {

	_patchInformation(): PatchInformation;

	_handleGet(property: string, args: IArguments): any;

	_handleSet(property: string, value: any): any;
}
