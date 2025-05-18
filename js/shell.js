const shell = document.createElement("div")

const prev = document.createElement("div")
shell.appendChild(prev)

const promptLine = document.createElement("div")
promptLine.id = "prompt-line"

const shellPrompt = document.createElement("span")
shellPrompt.innerText = "$ "
promptLine.appendChild(shellPrompt)

const input = document.createElement("input")
input.id = "shell-input"
promptLine.appendChild(input)

shell.appendChild(promptLine)

input.onkeyup = ev => {
	if (ev.keyCode === 13) {
		const raw = input.value
		input.style.display = "none"
		appendPrev(`$ ${raw}`)
		runIt(raw)
		input.value = ""
		input.style.display = "initial"
		input.scrollIntoView({ block: "end" })
	}
}

commands = {
	help: [function() {
		appendPrev("shkid: epskidOS shell")
		appendPrev("here are the available commands:")

		for ([command, value] of Object.entries(commands)) {
			appendPrev(` * ${command} -- ${value[1]}`)
		}
	}, "get help"],
	clear: [function() {
		welcome.innerText = ""
		prev.innerText = ""
	}, "clear the screen"],
	github: [function() {
		window.open("https://github.com/epskid", '_blank').focus()
	}, "open github.com/epskid in a new tab"],
	whoami: [function() {
		appendPrev("i'm epskid")
		appendPrev("i do stuff with computers sometimes")
		appendPrev("being anonymous on the internet requires that online descriptions must be as vague as possible")
	}, "who am i?"],
	neofetch: [function() {
	 	appendPrev(
`     ___     epskid@browser
    / _ \\    OS: epskidOS
   |  __/    SHELL: shkid
    \\___|    STATUS: epic
   
`)
	}, "mandatory command on unix systems"]
}

function runIt(raw) {
	const lexed = raw.split(/[ \t]+/);
	const command = lexed[0]
	if (command === "") {
		return;
	}
	const args = lexed.slice(1)

	if (command in commands) {
		if (commands[command][0].length === args.length) {
			commands[command][0](...args)
		} else {
			appendPrev(`command \`${command}\` takes ${commands[command][0].length} argument(s) (passed ${args.length})`)
		}
	} else {
		appendPrev(`command \`${command}\` not found -- run \`help\` for a list of commands`)
	}
}

function appendPrev(text) {
	const shline = document.createElement("div")
	shline.innerText = text
	prev.appendChild(shline)
}

function loadShell() {
	document.body.appendChild(shell)
	input.focus()
	window.onfocus = _ => { input.focus() }
	window.onclick = _ => { input.focus() }
	setTimeout(_ => {
		appendPrev("shkid initialized")
		appendPrev("type `help` for help")
	}, 100)
}
