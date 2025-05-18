const text = document.body.innerText
document.body.innerHTML = `<hr id="scanline">`
document.body.style.opacity = 1

let i = 1
text.split('\n').forEach(line => {
	if ((line.length !== 0) && (line !== '\t')) {
		setTimeout(() => {
			document.body.innerHTML += line.slice(2) + "\n"
		}, (i++ + Math.random()) * 100)
	} 
})

setTimeout(loadShell, (i + 1) * 100)
