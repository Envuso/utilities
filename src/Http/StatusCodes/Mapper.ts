export const statusCodeToReasonPhrase: Record<string, string> = {
	"202" : "Accepted",
	"502" : "Bad Gateway",
	"400" : "Bad Request",
	"409" : "Conflict",
	"100" : "Continue",
	"201" : "Created",
	"417" : "Expectation Failed",
	"424" : "Failed Dependency",
	"403" : "Forbidden",
	"504" : "Gateway Timeout",
	"410" : "Gone",
	"505" : "HTTP Version Not Supported",
	"418" : "I'm a teapot",
	"419" : "Insufficient Space on Resource",
	"507" : "Insufficient Storage",
	"500" : "Internal Server Error",
	"411" : "Length Required",
	"423" : "Locked",
	"420" : "Method Failure",
	"405" : "Method Not Allowed",
	"301" : "Moved Permanently",
	"302" : "Moved Temporarily",
	"207" : "Multi-Status",
	"300" : "Multiple Choices",
	"511" : "Network Authentication Required",
	"204" : "No Content",
	"203" : "Non Authoritative Information",
	"406" : "Not Acceptable",
	"404" : "Not Found",
	"501" : "Not Implemented",
	"304" : "Not Modified",
	"200" : "OK",
	"206" : "Partial Content",
	"402" : "Payment Required",
	"308" : "Permanent Redirect",
	"412" : "Precondition Failed",
	"428" : "Precondition Required",
	"102" : "Processing",
	"407" : "Proxy Authentication Required",
	"431" : "Request Header Fields Too Large",
	"408" : "Request Timeout",
	"413" : "Request Entity Too Large",
	"414" : "Request-URI Too Long",
	"416" : "Requested Range Not Satisfiable",
	"205" : "Reset Content",
	"303" : "See Other",
	"503" : "Service Unavailable",
	"101" : "Switching Protocols",
	"307" : "Temporary Redirect",
	"429" : "Too Many Requests",
	"401" : "Unauthorized",
	"451" : "Unavailable For Legal Reasons",
	"422" : "Unprocessable Entity",
	"415" : "Unsupported Media Type",
	"305" : "Use Proxy"
};
export const reasonPhraseToStatusCode: Record<string, number> = {
	"Accepted"                        : 202,
	"Bad Gateway"                     : 502,
	"Bad Request"                     : 400,
	"Conflict"                        : 409,
	"Continue"                        : 100,
	"Created"                         : 201,
	"Expectation Failed"              : 417,
	"Failed Dependency"               : 424,
	"Forbidden"                       : 403,
	"Gateway Timeout"                 : 504,
	"Gone"                            : 410,
	"HTTP Version Not Supported"      : 505,
	"I'm a teapot"                    : 418,
	"Insufficient Space on Resource"  : 419,
	"Insufficient Storage"            : 507,
	"Internal Server Error"           : 500,
	"Length Required"                 : 411,
	"Locked"                          : 423,
	"Method Failure"                  : 420,
	"Method Not Allowed"              : 405,
	"Moved Permanently"               : 301,
	"Moved Temporarily"               : 302,
	"Multi-Status"                    : 207,
	"Multiple Choices"                : 300,
	"Network Authentication Required" : 511,
	"No Content"                      : 204,
	"Non Authoritative Information"   : 203,
	"Not Acceptable"                  : 406,
	"Not Found"                       : 404,
	"Not Implemented"                 : 501,
	"Not Modified"                    : 304,
	"OK"                              : 200,
	"Partial Content"                 : 206,
	"Payment Required"                : 402,
	"Permanent Redirect"              : 308,
	"Precondition Failed"             : 412,
	"Precondition Required"           : 428,
	"Processing"                      : 102,
	"Proxy Authentication Required"   : 407,
	"Request Header Fields Too Large" : 431,
	"Request Timeout"                 : 408,
	"Request Entity Too Large"        : 413,
	"Request-URI Too Long"            : 414,
	"Requested Range Not Satisfiable" : 416,
	"Reset Content"                   : 205,
	"See Other"                       : 303,
	"Service Unavailable"             : 503,
	"Switching Protocols"             : 101,
	"Temporary Redirect"              : 307,
	"Too Many Requests"               : 429,
	"Unauthorized"                    : 401,
	"Unavailable For Legal Reasons"   : 451,
	"Unprocessable Entity"            : 422,
	"Unsupported Media Type"          : 415,
	"Use Proxy"                       : 305
};

/**
 * Returns the reason phrase for the given status code.
 * If the given status code does not exist, an error is thrown.
 *
 * @param {number|string} statusCode The HTTP status code
 * @returns {string} The associated reason phrase (e.g. "Bad Request", "OK")
 * */
export function getReasonPhrase(statusCode: (number | string)): (string) {
	const result = statusCodeToReasonPhrase[statusCode.toString()];
	if (!result) {
		throw new Error(`Status code does not exist: ${statusCode}`);
	}
	return result;
}

/**
 * Returns the status code for the given reason phrase.
 * If the given reason phrase does not exist, undefined is returned.
 *
 * @param {string} reasonPhrase The HTTP reason phrase (e.g. "Bad Request", "OK")
 * @returns {string} The associated status code
 * */
export function getStatusCode(reasonPhrase: string): (number) {
	const result = reasonPhraseToStatusCode[reasonPhrase];
	if (!result) {
		throw new Error(`Reason phrase does not exist: ${reasonPhrase}`);
	}
	return result;
}
