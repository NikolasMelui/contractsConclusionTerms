module.exports = (req, res, next)  => {

	req.date = dateDefine(req.date);

	const dateDefine = date => {
		if(!date instanceof Date) {
			

		const monthDefine = monthDig => {
			const russianMonths = {
				0: 'января',
				1: 'февраля',
				2: 'марта',
				3: 'апреля',
				4: 'мая',
				5: 'июня',
				6: 'июля',
				7: 'августа',
				8: 'сентября',
				9: 'октября',
				10: 'ноября',
				11: 'декабря',
			};
			for (let [key, value] of Object.entries(russianMonths)) {
				if (key == monthDig) return value;
			}
		};
	}
		req.
	}
	next();
};
