class ResponseMock {
	statusCode: number | undefined;
	statusMessage: string | undefined;
	status(code: number): this {
		this.statusCode = code;
		return this;
	}
	send(message: string): this {
		this.statusMessage = message;
		return this;
	}
}

export default ResponseMock;
