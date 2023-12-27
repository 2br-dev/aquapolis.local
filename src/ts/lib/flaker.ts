export default class Flaker {

	durations = [0, .5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8];

	constructor(count: number = 40) {
		const fragment = document.createDocumentFragment();

		let step = 100 / count;
		
		for (let i = 0; i < count; i++) {
			const flakeEl = document.createElement('div');
			flakeEl.className = "snowflake";

			$(flakeEl).css({
				position: 'fixed',
				top: '-10%',
				zIndex: 9999,
				userSelect: 'none',
				animationName: 'snowflakes-shake',
				animationDuration: '3s',
				animationTimingFunction: 'ease-in-out',
				animationDelay: this.durations[Math.round(Math.random() * this.durations.length)] + 's',
				left: (i * step) + '%',
				animationIterationCount: 'infinite',
				animationPlayState: 'running',
				pointerEvent: 'none'
			});
			
			const inner = document.createElement('div');
			inner.className = "inner";
			inner.textContent = "•";

			$(inner).css({
				animationName: 'snowflakes-fall',
				animationDuration: '10s',
				animationTimingFunction: 'linear',
				animationDelay: this.durations[Math.round(Math.random() * this.durations.length)] + 's',
				animationIterationCount: 'infinite',
				animationPlayState: 'running'
			})
			
			flakeEl.appendChild(inner);
			fragment.appendChild(flakeEl);
		}
		
		document.body.appendChild(fragment);
	}
}