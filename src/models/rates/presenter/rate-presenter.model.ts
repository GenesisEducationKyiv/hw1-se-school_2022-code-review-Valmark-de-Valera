class RatePresenterModel {
	public from: string;
	public to: string;
	public rate: number;

	constructor(from: string, to: string, rate: number) {
		this.from = from;
		this.to = to;
		this.rate = rate;
	}

	toObject(): object {
		return {
			from: this.from,
			to: this.to,
			rate: this.rate,
		};
	}
}

export default RatePresenterModel;
