// https://docs.fivem.net/docs/game-references/input-mapper-parameter-ids/

// the return we get from the NUI is in browser event format, but our code needs to us the R* format
const event_keycode_translator = {
	Backspace: 'BACK', Tab: 'TAB', Enter: 'RETURN', Pause: 'PAUSE', CapsLock: 'CAPITAL', Escape: 'ESCAPE',
	Space: 'SPACE', PageUp: 'PAGEUP', PageDown: 'PAGEDOWN', Home: 'HOME', End: 'END', ArrowLeft: 'LEFT',
	ArrowUp: 'UP', ArrowRight: 'RIGHT', ArrowDown: 'DOWN', PrintScreen: 'SNAPSHOT', Insert: 'INSERT',
	Delete: 'DELETE',

	// digits
	Digit0: '0', Digit1: '1', Digit2: '2', Digit3: '3', Digit4: '4', Digit5: '5', Digit6: '6', Digit7: '7', Digit8: '8', Digit9: '9', 

	// keys
	KeyA: 'A', KeyB: 'B', KeyC: 'C', KeyD: 'D', KeyE: 'E', KeyF: 'F', KeyG: 'G', KeyH: 'H', KeyI: 'I', KeyJ: 'J', KeyK: 'K', KeyL: 'L', KeyM: 'M', 
	KeyN: 'N', KeyO: 'O', KeyP: 'P', KeyQ: 'Q', KeyR: 'R', KeyS: 'S', KeyT: 'T', KeyU: 'U', KeyV: 'V', KeyW: 'W', KeyA: 'X', KeyY: 'Y', KeyZ: 'Z', 

	ContextMenu: 'APPS',

	// numpad
	Numpad0: 'NUMPAD0', Numpad1: 'NUMPAD1', Numpad2: 'NUMPAD2', Numpad3: 'NUMPAD3', Numpad4: 'NUMPAD4',
	Numpad5: 'NUMPAD5', Numpad6: 'NUMPAD6', Numpad7: 'NUMPAD7', Numpad8: 'NUMPAD8', Numpad9: 'NUMPAD9', 

	NumpadMultiply: 'MULTIPLY', NumpadAdd: 'ADD', NumpadSubtrack: 'SUBTRACT', NumpadDecimal: 'DECIMAL', NumpadDivide: 'DIVIDE',
	NumpadEnter: 'NUMPADENTER', NumpadEqual: 'NUMPADEQUALS', NumLock: 'NUMLOCK', ScrollLock: 'SCROLL',

	F1: 'F1', F2: 'F2', F3: 'F3', F4: 'F4', F5: 'F5', F6: 'F6', F7: 'F7', F8: 'F8', F9: 'F9', F10: 'F10', F11: 'F11', F12: 'F12',
	F13: 'F13', F14: 'F14', F15: 'F15', F16: 'F16', F17: 'F17', F18: 'F18', F19: 'F19', F20: 'F20', F21: 'F21', F22: 'F22', F23: 'F23', F24: 'F24',

	ShiftLeft: 'LSHIFT', ShiftRight: 'RSHIFT', ControlLeft: 'LCONTROL', ControlRight: 'RCONTROL', AltLeft: 'LMENU', AltRight: 'RMENU',
	Semicolon: 'SEMICOLON', Equal: 'EQUALS',

	0: 'MOUSE_LEFT', 1: 'MOUSE_MIDDLE', 2: 'MOUSE_RIGHT'
}


window.addEventListener("message", function(event) {
	const data = event.data;
	const callback = data.callback;

	if (callback != undefined) {
		const func = window[callback.type];
		if (func != undefined) {
			func(callback.data);
		}
	}
});


console.log('Uhhhh, here')
// We're adding a keylogger basically. We'll process this stuff at some point.
// let keysBound = []
let commandDetails = {

}
let keyMaps = [
	
]

function toggleoverlay() {
	$('#keybinds').show()
}



// let validCommands = {

// }

// $('#input_fields').append(`
//     <div class="row py-1 background-blobs">
//       <label for="channel${chan_num}" class="col-md-1 col-form-label chan-label">Channel ${chan_num}:
//         <input tabindex="-1" type="checkbox" class="form-check-input" id="check_ch${chan_num}" checked onclick="updateCheckedCh(${chan_num});" title="This checkbox toggles whether or not this field is included in the 311 status output">
//       </label>
//       <button tabindex="-1" class="btn btn-condensed-px" type="button" onclick="addInfoBox(${chan_num})"><img src="/assets/circle_plus.svg" width="24" height="24" style="filter: invert(1)"></img></button>
//       <div class="col-5 d-grid px-1">
//         <input autocomplete="off" id="channel${chan_num}" class="form-control" type="text" name="channel_text" placeholder="${placeholder}" value="${default_value}" >
//       </div>
//       <div class="col-1 d-grid px-1">
//         <button data-btn-type='blue' tabindex="-1" type="button" class="btn"
//           onclick="navigator.clipboard.writeText('/311 🛎️ 77s Channel ${chan_num} 🛎️');">🛎️ 77s 🛎️</button>
//       </div>
//       <div class="col d-grid px-1">
//         <button data-btn-type='danger' tabindex="-1" type="button" class="btn"
//           onclick="navigator.clipboard.writeText('/311 🚨 13A Channel ${chan_num} 🚨');">🚨 13a 🚨</button>
//       </div>
//       <div class="col d-grid px-1">
//         <button data-btn-type='danger' tabindex="-1" type="button" class="btn"
//           onclick="navigator.clipboard.writeText('/311 📢 78s Channel ${chan_num} 📢');">📢 78s 📢</button>
//       </div>
//       <div class="animated" id="infoBoxesCh${chan_num}"></div>
//     </div>`)


function commandProcessor(key, state) {
	// console.log(key)
	// console.log(keyMaps)
	keyMaps.forEach((x) => {
		// console.log(x['key'])
		// console.log(event_keycode_translator[x['key']])
		// console.log(key)
		let command = x['command']
		if (event_keycode_translator[key] != x['key']) { return; }
		if (state == 'up') {
			command = '-' + command.slice(1);
		}
		
		post("twiliKeybinds:triggerCommand", {
			command: command,
			key: x['key']
		})
		// console.dir(x['command'])
		// console.log(x)
	})
	// post("twiliKeybinds:triggerCommand", )
}


function registerKeyMapping(data) {
	// console.log(command, description, inputType, defaultKey)
	const command = data[0]
	const description = data[1]
	const inputType = data[2]
	const defaultKey = data[3]
	// console.log(description)
	// if (description == undefined && inputType == undefined && defaultKey == undefined) {
	// 	description = command[1]
	// }
	// console.dir(command)
	// console.log('we are here :)')
	commandDetails[command] = { description: description, inputType: inputType,	defaultKey: defaultKey }
	keyMaps.push({ command: command, key: defaultKey })
	// $('#keybinds').append()

	// <label for="channel${chan_num}" class="col-md-1 col-form-label chan-label">Channel ${chan_num}:
    //         <input tabindex="-1" type="checkbox" class="form-check-input" id="check_ch${chan_num}" checked onclick="updateCheckedCh(${chan_num});" title="This checkbox toggles whether or not this field is included in the 311 status output">
    //     </label>
	// console.log($('#keybinds'))
	// <label class="flex-grow">${command}</label><input tabindex="-1" type="text" placerholder="${defaultKey}"}</input>

	// <div class='tooltip'><span class='tooltip-text'>%s</span><span>%s</span>%s</div>
	$('#keybinds').append(`<label class="">${command}<br><sub>${description}</sub><br><input tabindex="-1" type="text" placeholder="${defaultKey}"}</input></label>`)
	// $('#keybinds').append(`<div class="flex-grow"><input></div>`)

}


// registerKeyMapping('test', 'Not important', 'keyboard', 'F1')
// registerKeyMapping('test2', 'Not important', 'keyboard', 'F2')
// registerKeyMapping('test3', 'Not important', 'keyboard', 'F2')
// registerKeyMapping('test3', 'Not important', 'keyboard', 'F2')
// registerKeyMapping('test3', 'Not important', 'keyboard', 'F2')



// window.addEventListener("keypress", (event) => {  // +
//     console.log(`KEYPRESS ${event.code}`)
// });

window.addEventListener("mousedown", (event) => {  // +
    // console.log(`MOUSEDOWN ${event.button}`)
	commandProcessor(event.button, 'down')
	// twiliKeybinds:triggerCommand
});
window.addEventListener("mouseup", (event) => {  // -
    // console.log(`MOUSEUP ${event.button}`)
	commandProcessor(event.button, 'up')
});

window.addEventListener("keydown", (event) => {  // +
    // console.log(`KEYDOWN ${event.code}`)
	commandProcessor(event.code, 'down')
});
window.addEventListener("keyup", (event) => {  // -
    // console.log(`KEYUP ${event.code}`)
	commandProcessor(event.code, 'up')
});


function post(type, data) {
	try {
		fetch(`https://${GetParentResourceName()}/${type}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
			},
			body: JSON.stringify(data)
		})
	} catch {}
}


function setFocus(value) {
	document.querySelector("#handling").style.display = value ? "block" : "none";
}
