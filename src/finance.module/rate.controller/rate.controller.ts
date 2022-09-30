import { Body, Controller, Get, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { FinanceService } from '../finance.service/finance.service';
import { RatePresenterFabric } from './presenter/rate-presenter.fabric';
import { presenterKeysDict } from './presenter/const/presenter.const';
import {
	ApiBody,
	ApiConsumes,
	ApiOperation,
	ApiProduces,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';
import { changeProviderByKey, changeProviderByName, rateBTC2UAH } from './const/rate-swagger.const';
import { providersKeysDict, providersNamesDict } from '../finance.service/const/providers.const';

@Controller('rate')
@ApiTags('rate')
@ApiProduces('application/json')
export class RateController {
	private _defaultPresenterKey: string = process.env.RATE_PRESENTER || presenterKeysDict.json;
	private _ratePresenterFabric: RatePresenterFabric;
	private _financeService: FinanceService;

	constructor(_financeService: FinanceService, _ratePresenterFabric: RatePresenterFabric) {
		this._financeService = _financeService;
		this._ratePresenterFabric = _ratePresenterFabric;
	}

	@Put('/changeProviderByName')
	@ApiOperation(changeProviderByName.ApiOperation)
	@ApiConsumes(changeProviderByName.ApiConsumes[0])
	@ApiResponse(changeProviderByName.ApiResponses[0])
	@ApiResponse(changeProviderByName.ApiResponses[1])
	@ApiBody(changeProviderByName.ApiBody[0])
	changeProviderByName(@Req() req: Request, @Res() res: Response, @Body('name') name: string) {
		const result = this._financeService.setActiveProviderByName(name);
		result
			? res?.send('Провайдер успішно змінено')
			: res
					.status(404)
					.send(
						`Провайдер не знайдено. Доступні провайдери: ${Object.values(
							providersNamesDict,
						)}`,
					);
	}

	@Put('/changeProviderByKey')
	@ApiOperation(changeProviderByKey.ApiOperation)
	@ApiConsumes(changeProviderByKey.ApiConsumes[0])
	@ApiResponse(changeProviderByKey.ApiResponses[0])
	@ApiResponse(changeProviderByKey.ApiResponses[1])
	@ApiBody(changeProviderByKey.ApiBody[0])
	changeProviderByKey(@Req() req: Request, @Res() res: Response, @Body('key') key: string) {
		const result = this._financeService.setActiveProviderByKey(key);
		result
			? res.send('Провайдер успішно змінено')
			: res
					.status(404)
					.send(
						`Провайдер не знайдено. Доступні провайдери: ${Object.values(
							providersKeysDict,
						)}`,
					);
	}

	@Get('BTC/UAH')
	@ApiOperation(rateBTC2UAH.ApiOperation)
	@ApiResponse(rateBTC2UAH.ApiResponses[0])
	@ApiResponse(rateBTC2UAH.ApiResponses[1])
	async getBtcUahRateAsync(@Req() req: Request, @Res() res: Response) {
		let rateValue: number;
		const presenter = this._ratePresenterFabric.getPresenterByKey(this._defaultPresenterKey);
		try {
			rateValue = await this._financeService.getRateAsync();
			res.send(presenter.presentRateExchange('BTC', 'UAH', rateValue));
		} catch (e: any) {
			res.status(e?.code || 400).send(e?.message || 'Undefined error');
		}
	}
}
