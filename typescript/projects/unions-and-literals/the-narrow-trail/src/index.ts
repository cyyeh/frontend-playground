export function runCommands() {
	let availableResource: "food" | "water" | undefined;
	let day = 1;
	let food = 5;
	let water = 5;

	while (day <= 7 && food !== 0 && water !== 0) {
		let num = Math.ceil(Math.random() * 6);

		switch (num) {
			case 1:
				availableResource = "food";
				break;
			case 2:
				availableResource = "water";
				break;
			case 3:
			case 4:
			case 5:
			case 6:
				if (!availableResource) {
					availableResource = num % 2 === 0 ? "food" : "water";
				} else if (availableResource === "food") {
					food += num;
				} else {
					water += num;
				}
				break;
		}

		food -= 1;
		water -= 1;
		day += 1;
	}

	if (food !== 0 && water !== 0) {
		return true;
	}

	return false;
}
