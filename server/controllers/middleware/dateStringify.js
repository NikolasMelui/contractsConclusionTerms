module.exports = date => {
	const curDate = date;
	const monthDefine = month => {
		const russianMonths = 'января,февраля,марта,апреля,мая,июня,июля,августа,сентября,октября,ноября,декабря'.split(
			','
		);
		return russianMonths[month];
	};

	const weekdayDefine = weekday => {
		const russianWeekdays = 'воскресенье,понедельник,вторник,среда,четверг,пятница,суббота'.split(',');
		return russianWeekdays[weekday];
	};

	return `${curDate.getDate()} ${monthDefine(curDate.getMonth())} ${curDate.getFullYear()} года, ${weekdayDefine(
		curDate.getDay()
	)}`;
};
