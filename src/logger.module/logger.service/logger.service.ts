/* eslint-disable */
import { Inject, Injectable, Scope } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoggerService as LoggerServicePar } from '@nestjs/common';
import { Observable } from 'rxjs';

const loggerLevels = [
	'verb', 'debug', 'warn', 'error', 'info'
]

export class LoggerService implements LoggerServicePar {
	private readonly _serviceName;
	private _subscribersRmqService: ClientProxy;
	private levels = {
		console: 'error',
		rabbit: 'debug'
	}

	constructor(@Inject('Default_Name') _serviceName: string, @Inject('SUBSCRIBERS_LOG_RMQ_SERVICE') _subscribersRmqService: ClientProxy) {
		this._serviceName = _serviceName;
		this._subscribersRmqService = _subscribersRmqService;
	}

	log(message: any, ...optionalParams: any[]) {
		message = `[${this._serviceName}:info] ${message}`;
		this.checkForLog('info', this.levels.console) ? console.log(message): null;
		this.checkForLog('info', this.levels.rabbit) ? this._subscribersRmqService.send({cmd:'consumer'}, message): null;
	}

	error(message: any, ...optionalParams: any[]) {
		message = `[${this._serviceName}:error] ${message}`;
		this.checkForLog('error', this.levels.console) ? console.log(message): null;
		this.checkForLog('error', this.levels.rabbit) ? this._subscribersRmqService.send({cmd:'consumer'}, message): null;
	}

	warn(message: any, ...optionalParams: any[]) {
		message = `[${this._serviceName}:warn] ${message}`;
		this.checkForLog('warn', this.levels.console) ? console.log(message): null;
		this.checkForLog('warn', this.levels.rabbit) ? this._subscribersRmqService.send({cmd:'consumer'}, message): null;
	}

	debug?(message: any, ...optionalParams: any[]) {
		message = `[${this._serviceName}:warn] ${message}`;
		this.checkForLog('debug', this.levels.console) ? console.log(message): null;
		this.checkForLog('debug', this.levels.rabbit) ? this._subscribersRmqService.send({cmd:'consumer'}, message): null;
	}

	verbose?(message: any, ...optionalParams: any[]) {
		message = `[${this._serviceName}:verb] ${message}`;
		this.checkForLog('verb', this.levels.console) ? console.log(message): null;
		this.checkForLog('verb', this.levels.rabbit) ? this._subscribersRmqService.send({cmd:'consumer'}, message): null;
	}

	checkForLog(level: string, minLevel: string) {
		return loggerLevels.indexOf(level) >= loggerLevels.indexOf(minLevel);
	}
}
