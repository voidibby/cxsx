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

const timelineElements = document.querySelectorAll(".timeline-element")
const getYears = () => {
	const arr = new Array()
	for (let i = 0; i < timelineElements.length; i++) {
		arr.push({ index: i, year: Number(timelineElements[i].childNodes[0].textContent) })
	}
	arr.sort(function (a, b) {
		return b.year - a.year
	})
	return arr
}
const years = getYears()
//console.log(years)

let counter = 0
let timelineElementsContainers = new Array()
const timelineWrapper = document.getElementsByClassName("timeline-wrapper")[0]
for (let i = 0; i < years.length; i++) {
	if (years[i].year === years[i == 0 ? years.length - 1 : i - 1].year) {
	} else {
		counter++
		let timelineElementContainer = document.createElement("div")
		timelineElementContainer.classList.add("timeline-element-container")
		timelineWrapper.appendChild(timelineElementContainer)
		timelineElementsContainers.push(timelineElementContainer)
	}
}
//console.log(timelineElementsContainers)

let wWidth = timelineElements[0].parentElement.parentElement.clientWidth
let wHeight = timelineElements[0].parentElement.parentElement.clientHeight

let wIncrement = wWidth / counter
let xPos = wIncrement / 2
let containersCounter = 0

let wtimelineEl = timelineElements[0].clientWidth
for (let i = years.length - 1; i >= 0; i--) {
	let finalPos = ((xPos - wtimelineEl / 2) * 100) / wWidth + "%"
	//for (let j = 0; j < counter; j++) {
	//console.log(i == 0 ? years.length - 1 : i - 1)
	console.log(containersCounter)
	if (years[i].year === years[i == 0 ? years.length - 1 : i - 1].year) {
		//timelineElements[years[i].index].style.left = finalPos
		timelineElementsContainers[containersCounter].appendChild(timelineElements[years[i].index])
		timelineElementsContainers[containersCounter].setAttribute("year", years[i].year)
		timelineElements[years[i].index].classList.remove("timeline-element-temp")
	} else {
		//xPos += wIncrement
		//timelineElements[years[i].index].style.left = finalPos
		timelineElementsContainers[containersCounter].appendChild(timelineElements[years[i].index])
		timelineElementsContainers[containersCounter].setAttribute("year", years[i].year)
		timelineElements[years[i].index].classList.remove("timeline-element-temp")
		containersCounter++
	}
	//}
}

let arr = [1990, 1995, 1875, 1756, 1995, 1753, 1995, 1756, 2023, 1989, 2023]
arr.sort(function (a, b) {
	return a - b
})

for (let i = 0; i < arr.length; i++) {
	//console.log(arr[i])
}

let counterTwo = 0
let arr1 = new Array()
for (let i = 0; i < arr.length - 1; i++) {
	if (arr[i] == arr[i + 1]) {
		arr1.push(counterTwo)
	} else {
		counterTwo++
		arr1.push(counterTwo)
	}
}

const mouseCursor = document.getElementsByClassName("cursor")[0]
const timelineYearTag = document.getElementsByClassName("timeline-year-tag")[0]
window.addEventListener("mousemove", (event) => {
	mouseCursor.style.left = event.pageX + "px"
	timelineYearTag.style.left = `${(event.pageX * 100) / wWidth}%`
	timelineYearTag.style.transform = `translateX(-${(event.pageX * 100) / wWidth}%)`
	if (event.target.getAttribute("year") != null) {
		timelineYearTag.childNodes[0].innerText = `${event.target.getAttribute("year")}`
	} else if (event.target.parentElement.parentElement.hasAttribute("year")) {
		timelineYearTag.childNodes[0].innerText = `${event.target.parentElement.parentElement.getAttribute(
			"year"
		)}`
	}
	//console.log(`translateX(${(event.pageX * 100) / wWidth}%)`)
})
