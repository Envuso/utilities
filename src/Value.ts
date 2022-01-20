import {ObjectId} from "mongodb";
import {ClassType} from "./types";

export class Value {

	public static isPrimitive(type: ClassType<any>) {
		return (type === ObjectId || type === String || type === Number || type === Boolean);
	}

	public static patch(location: any, property: string, handler: Function, isEnumerable: boolean = false) {
		Object.defineProperty(location, property , {
			enumerable   : isEnumerable,
			configurable : true,
			get(){
				return function() {
					return handler.call(this, ...arguments);
				}
			},
			set(v: any) {
				this[property] = v;
			}
		})

	}
}
