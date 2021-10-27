const txt = document.querySelector('#txt-area')
const res = document.querySelector('.result')
const message = document.querySelector('.message')
const count = document.querySelector('.count')
const btnCopy = document.querySelector('#copy')
const btnReset = document.querySelector('#reset')
const lineEnd = document.querySelector('#line-end')

const enter = () => {
	if (txt.value !== '') {
		btnReset.disabled = false
		let regArr = txt.value.match(/[0-9]{6}[-]{1}[0-9]{5}/g)
		res.innerHTML = ''

		if (regArr !== null) {
			regArr.forEach(el => res.innerHTML += `${el}<br>`)
		} else {
			res.innerHTML = 'Совпадений не найдено'
		}

		lineEnd.style.display = 'block'

		let countWords = `Найдено <span class="num">${regArr.length}</span> совпадени`

		if (regArr.length === 1) {
			count.innerHTML = countWords + 'е'
		} else if (regArr.length > 1 && regArr.length < 5) {
			count.innerHTML = countWords + 'я'
		} else {
			count.innerHTML = countWords + 'й'
		}
	} else {
		clean()
	}
	res.innerHTML === 'Совпадений не найдено' || res.innerHTML === 'Здесь отобразится результат работы фильтра' ? btnCopy.disabled = true : btnCopy.disabled = false
}

const showMessage = () => {
	message.style.top = 0
	setTimeout(() => {
		message.style.top = '-40px'
	},3000)
}

const copy = () => {
	let range = document.createRange()
	range.selectNode(res)
	window.getSelection().removeAllRanges()
	window.getSelection().addRange(range)
	document.execCommand("copy");
	window.getSelection().removeAllRanges()
	btnCopy.disabled = true
	showMessage()
}

const clean = () => {
	txt.value = ''
	res.innerHTML = 'Здесь отобразится результат работы фильтра'
	count.innerHTML = ''
	lineEnd.style.display = 'none'
	btnReset.disabled = true
	btnCopy.disabled = true
}

txt.addEventListener('input',enter)
btnReset.addEventListener('click',clean)
btnCopy.addEventListener('click',copy)