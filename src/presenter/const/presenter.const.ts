import JsonRatePresenter from '../rate-presenters/json.rate-presenter';
import XmlRatePresenter from '../rate-presenters/xml.rate-presenter';
import StringRatePresenter from '../rate-presenters/string.rate-presenter';

export const presenterKeysDict = {
	json: 'json',
	xml: 'xml',
	string: 'string',
};

export const presenterClassesDict = {
	json: JsonRatePresenter,
	xml: XmlRatePresenter,
	string: StringRatePresenter,
};
