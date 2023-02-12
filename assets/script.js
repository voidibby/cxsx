const clean = (node) => {
	for (var n = 0; n < node.childNodes.length; n++) {
		var child = node.childNodes[n]
		if (child.nodeType === 8 || (child.nodeType === 3 && !/\S/.test(child.nodeValue))) {
			node.removeChild(child)
			n--
		} else if (child.nodeType === 1) {
			clean(child)
		}
	}
}
clean(document)

// Distribute on a defined amount of containers a defined less amout of elements

const distributeElementsRandomly = (elementsAmount, containersAmount) => {
	const fillElementsArray = () => {
		const elementsArray = new Array(elementsAmount)
		for (let i = 0; i < elementsArray.length; i++) {
			elementsArray[i] = i
		}
		return elementsArray
	}

	const getRandomContainerIndexes = () => {
		const containerIndexes = []
		while (containerIndexes.length < elementsAmount) {
			const randomNumber = Math.floor(Math.random() * containersAmount)
			if (!containerIndexes.includes(randomNumber)) {
				containerIndexes.push(randomNumber)
			}
		}
		return containerIndexes
	}
	const containerIndexes = getRandomContainerIndexes()

	const containers = new Array(containersAmount)
	const elements = fillElementsArray()

	for (let i = 0; i < elements.length; i++) {
		containers[containerIndexes[i]] = elements[i]
	}
	return containers
}

const rowElements = 10

const listEl = document.getElementsByClassName("list-element-button")
let distributedRandomArray = distributeElementsRandomly(listEl.length, rowElements * rowElements)

// Set list elements size
for (let i = 0; i < listEl.length; i++) {
	const wWidth = listEl[0].parentElement.parentElement.clientWidth
	const wHeight = listEl[0].parentElement.parentElement.clientHeight
	listEl[i].style.width = ((wWidth / rowElements) * 100) / wWidth + "%"
	listEl[i].style.height = ((wHeight / rowElements) * 100) / wHeight + "%"
}

const wIncrement = listEl[0].parentElement.parentElement.clientWidth / rowElements
const hIncrement = listEl[0].parentElement.parentElement.clientHeight / rowElements
let counter = 0

const positionListELements = () => {
	const wWidth = listEl[0].parentElement.parentElement.clientWidth
	const wHeight = listEl[0].parentElement.parentElement.clientHeight
	for (let x = 0; x < wWidth; x += wIncrement) {
		for (let y = 0; y < wHeight; y += hIncrement) {
			let distArrRam = distributedRandomArray[counter]
			if (distArrRam != null) {
				listEl[distArrRam] = listEl[distArrRam].style.top = (y * 100) / wHeight + "%"
				listEl[distArrRam] = listEl[distArrRam].style.left = (x * 100) / wWidth + "%"
			}
			counter++
		}
	}
}

positionListELements()

const openModalOne = (modalSibiling) => {
	modalSibiling.parentElement.childNodes[1].classList.remove("hidden")
}

const closeModal = (modalClosingButton) => {
	modalClosingButton.parentElement.parentElement.classList.add("hidden")
}

const modalClosingButton = document.getElementsByClassName("modal-closing-button")
const modalContainer = document.getElementsByClassName("modal-one-container")

for (let i = 0; i < modalContainer.length; i++) {
	modalClosingButton[i].addEventListener("click", (event) => {
		closeModal(modalClosingButton[i])
	})

	modalContainer[i].addEventListener("click", (event) => {
		if (event.target.className == "modal-one-container") {
			modalContainer[i].classList.add("hidden")
		}
	})
}

for (let i = 0; i < listEl.length; i++) {
	listEl[i].addEventListener("click", (event) => {
		openModalOne(listEl[i])
	})
}
