import path from "path";
import {Context} from "./Http/Context";
import {Request} from "./Http/Request";
import {Response} from "./Http/Response";
import {StatusCodes} from "./Http/StatusCodes";
import {TestingMiddleware} from "./Middleware/TestingMiddleware";
import {Router} from "./Routing/Router";
import {HttpMethod} from "./Routing/RouterTypes";
import {HttpServer} from "./Server";

const server = new HttpServer({
	baseUrl                 : 'http://127.0.0.1',
	fileUploadTempDirectory : path.join(process.cwd(), 'Storage', 'Temp')
});

const testHandler = async (request: Request, response: Response) => {
	return {
		message : 'Hello World!'
	};
};

Router
	.get('/hello', (request: Request, response: Response) => {
		return {
			message       : `Hello world from non async handler.`,
			testRequestId : Context.get().testId,
		};
	})
	.middleware(TestingMiddleware);

Router.get('/hello/:name?', async (request: Request, response: Response) => {
	return {message : `Hello ${request.route().parameter('name', 'World!!!')}`};
});

Router.get('/register', async (request: Request, response: Response) => {
	try {
		Router.register(
			Router.get('/registered', async (request: Request, response: Response) => {
				return {message : 'Hello from registered.'};
			})
		);
	} catch (error) {
		return new Response(StatusCodes.BAD_REQUEST).withData({message : error.message});
	}

	return {success : Router.has(HttpMethod.GET, '/registered')};
});

Router.get('/is-registered', async (request: Request, response: Response) => {
	return {status : Router.has(HttpMethod.GET, '/registered')};
});

Router.get('/remove', async (request: Request, response: Response) => {
	Router.removeRouteRegistration(HttpMethod.GET, '/registered');

	return {status : Router.has(HttpMethod.GET, '/registered')};
});

Router.post('/post', async (request: Request, response: Response) => {
	return {data : request.all()};
});

Router.post('/file-upload', async (request: Request, response: Response) => {
	return {data : request.all()};
});

server.listen(3333);
