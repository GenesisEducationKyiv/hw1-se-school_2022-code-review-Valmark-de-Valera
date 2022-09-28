/* eslint-disable no-unused-vars */
export interface IRatePresenter {
	presentRateExchange(from: string, to: string, rate: number): string;
}
