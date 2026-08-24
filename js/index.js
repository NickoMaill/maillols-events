const header = document.getElementById("siteHeader");
const currentYear = document.getElementById("currentYear");

if (currentYear) {
	currentYear.textContent = new Date().getFullYear().toString();
}

if (header) {
	let ticking = false;

	const updateHeader = () => {
		header.classList.toggle("is-scrolled", window.scrollY > 24);
		ticking = false;
	};

	window.addEventListener("scroll", () => {
		if (!ticking) {
			window.requestAnimationFrame(updateHeader);
			ticking = true;
		}
	}, { passive: true });

	updateHeader();
}

const media = window.matchMedia("(max-width: 767px)");

const reOrderSteps = ({ matches: isMobile }) => {
    const comprendre = document.getElementById("comprendre");
    const structurer = document.getElementById("structurer");
    const coordonner = document.getElementById("coordonner");
    const concretiser = document.getElementById("concretiser");

    const parent1 = comprendre.parentElement;
    const parent2 = concretiser.parentElement;

    if (isMobile) {
        parent1.append(structurer);
        parent2.prepend(coordonner);
    } else {
        parent1.append(coordonner);
        parent2.prepend(structurer);
    }
};

media.addEventListener("change", reOrderSteps);
reOrderSteps(media);