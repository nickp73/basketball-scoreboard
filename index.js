
document.addEventListener('DOMContentLoaded', () => {
	// Get score display elements
	const homeScoreEl = document.getElementById('home-score');
	const visitorScoreEl = document.getElementById('visitor-score');
	// Get the quarter display element
	const quarterEl = document.getElementById('inning');
	
	// --- Score Functionality ---
	const teams = {
		home: { score: 0, scoreEl: homeScoreEl },
		visitor: { score: 0, scoreEl: visitorScoreEl },
	};
	
	function addScore(points, team) {
		const teamData = teams[team];
		teamData.score += points;
		teamData.scoreEl.textContent = teamData.score; // This should be teamData.score
		highlightLeader();
	}

	/**
	 * Compares scores and applies a 'leading' class to the team with the higher score.
	 */
	function highlightLeader() {
		const homeContainer = homeScoreEl.closest('.inner-top-box');
		const visitorContainer = visitorScoreEl.closest('.inner-top-box');

		homeContainer.classList.remove('leading');
		visitorContainer.classList.remove('leading');

		if (teams.home.score > teams.visitor.score) {
			homeContainer.classList.add('leading');
		} else if (teams.visitor.score > teams.home.score) {
			visitorContainer.classList.add('leading');
		}
	}
	
	// Programmatically add event listeners to all score buttons
	['home', 'visitor'].forEach(team => {
		[1, 2, 3].forEach(points => {
			const button = document.getElementById(`${team}-add-${points}`);
			if (button) {
				button.addEventListener('click', () => addScore(points, team));
			}
		});
	});

	// --- Timer Functionality ---
	const timeEl = document.getElementById('time-remaining');
	let timeInSeconds = 48 * 60; // 48 minutes converted to seconds
	let timerInterval; // Variable to hold the interval ID
	
	/**
	 * Updates the timer display every second.
	 */
	function updateTimer() {
		const minutes = Math.floor(timeInSeconds / 60);
		const seconds = timeInSeconds % 60;
		
		timeEl.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

		quarterEl.textContent = `QUARTER: ${getQuarter(timeInSeconds)}`;

		if (timeInSeconds <= 0) {
			clearInterval(timerInterval); // Stop the timer when it reaches 0
			timeEl.textContent = "00:00";
			quarterEl.textContent = "FINAL";
		} else {
			timeInSeconds--; // Decrement the time
		}
	}
	
	// Start the timer when the page loads.
	updateTimer(); // Set the initial display to 48:00
	timerInterval = setInterval(updateTimer, 1000); // Update the timer every second

	function getQuarter(timeInSeconds, totalGameTime = 2880) { // 48 min = 2880 sec
		const quarterLength = totalGameTime / 4;
		const elapsed = totalGameTime - timeInSeconds;

		if (timeInSeconds <= 0) return 'FINAL';
		if (elapsed < quarterLength) return 'Q1';
		if (elapsed < quarterLength * 2) return 'Q2';
		if (elapsed < quarterLength * 3) return 'Q3';
		return 'Q4';
	}
});
