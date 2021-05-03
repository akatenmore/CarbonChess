function showSection(section) {
	$('#back').classList.remove('hide');
	$('#select-opponent').classList.add('hide');
	$('#' + section + '-settings').classList.remove('hide');
}

function back() {
	$('#back').classList.add('hide');
	$('#select-opponent').classList.remove('hide');
	$$('[id*="settings"]').forEach(elem => elem.classList.add('hide'));
}

function updatePlay(type, elem) {
	const botPlay = $('#bot-play a');
	const offlinePlay = $('#offline-play');
	if (type === 'intelligence') {
		botPlay.href = botPlay.href.replace(/(botIntelligence=)\d+/, '$1' + elem.value);
	}
	else if (type === 'colour') {
		const text = elem.innerText.toLowerCase();
		const random = Math.floor(Math.random() * 2);
		$$('#bot-colour .card').forEach(a => a.classList.remove('selected'));
		botPlay.href = botPlay.href.replace(/(botColour=)\w+/, '$1' + (text === 'random' ? random : text));
		elem.classList.add('selected');
	}
	else if (type === 'rules') {
		const autoflipWrapper = $('#offline-autoflip-wrapper');
		const autoflip = $('#offline-autoflip');
		autoflipWrapper.classList.remove('disabled');
		autoflip.disabled = false;
		offlinePlay.href = offlinePlay.href.replace(/(?<=free=)\d/, elem.checked ? 0 : 1);
		if (!elem.checked) {
			autoflip.disabled = true;
			autoflip.checked = false;
			autoflipWrapper.classList.add('disabled');
		}
	}
	else if (type === 'autoflip') {
		offlinePlay.href = offlinePlay.href.replace(/(?<=autoflip=)\d/, elem.checked ? 1 : 0);
	}
}

function updateBotIntelligence() {
	const level = $('#bot-intelligence-level').value;
	$$(`[data-level]`).forEach(elem => elem.classList.add('hide'));
	$(`[data-level="${level}"]`).classList.remove('hide');
	$('#bot-intelligence-dots').innerHTML = ' • '.repeat(level - 1) + ` <span id="dot-highlighted">•</span> ` + ' • '.repeat(4 - level);
}

function createGameCode() {
	$('#game-code').value = Math.random().toString().substr(2, 5);
}

function updateOnlinePlay(elem) {
	$('#online-play').href = $('#online-play').href.replace(/(?<=gamecode=)\d+/, $('#game-code').value);
}
