const text = document.body.innerText
document.body.innerHTML = `<hr id="scanline"><div id="welcome"></div>`
document.body.style.opacity = 1
const welcome = document.getElementById("welcome")

let i = 1
text.split('\n').forEach(line => {
	if ((line.length !== 0) && (line !== '\t')) {
		setTimeout(() => {
			welcome.innerText += line.slice(2) + "\n"
		}, (i++ + Math.random()) * 100)
	} 
})

setTimeout(loadShell, (i + 1) * 100)
