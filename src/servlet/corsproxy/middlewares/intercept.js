import { get, find, isMatch } from '../../../base';
import {OK} from '../../const/status';

export default (req, res, next) => {
	const interceptions = get(req, 'proxy.rule.interceptions');

	// TODO Support json-schema
	const captured = find(interceptions, ({req: _req}) => isMatch(req, _req));

	if (!captured) {
		return next();
	}

	const {headers, body, status=OK} = captured.res;

	res.header(headers);
	res.status(status);
	res.send(body);

}