module.exports = dateString => {
	dateString = dateString.split('-');

	const monthDefine = month => {
		let curResult = '';
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
		for (const [key, value] of Object.entries(russianMonths)) {
			if (key == parseInt(month)) {
				curResult = value;
			}
		}
		return curResult;
	};
	return `${dateString[2]} ${monthDefine(dateString[1])} ${dateString[0]} года`;
};
