/* eslint-disable no-undef */
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
function fail(reason = 'fail was called in a test.') {
	throw new Error(reason);
}

global.fail = fail;

module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
};
