const endBtn = document.getElementById("toTheEndBtn");
const contactBtn = document.getElementById("contactBtn");

const hideOrShowEndBtn = () => {
	const obs = new IntersectionObserver(([entry]) => {
		if (entry.isIntersecting) {
			endBtn.classList.toggle("d-none");
		} else {
			endBtn.classList.toggle("d-none");
		}
	});
	obs.observe(contactBtn);
};

hideOrShowEndBtn();
