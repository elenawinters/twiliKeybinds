function establishFocus() {
    SetNuiFocus(true, false)
    SetNuiFocusKeepInput(true)
}


function openKeybindMenu() {
    
}

// establishFocus()
// on('playerSpawned', () => {
//     establishFocus()
// })

// SetNuiFocus(true, true)
// SetNuiFocusKeepInput(true)

GAME == FIVEM ? console.log('Detected FiveM. Defaulting to FiveM.') : console.log('Detected RedM. Setting up custom keybind maps.');

// if (GAME == REDM) {
on('onClientResourceStart', () => {
    establishFocus()
})

let scriptsRevoking = []
// The following 2 listeners make sure that scripts can control us.
on('twiliKeybinds:establishFocusInputs', (origin) => {
    if (scriptsRevoking.indexOf(origin) != -1) {
        scriptsRevoking.splice(scriptsRevoking.indexOf(origin), 1)
    }
    if (scriptsRevoking.length != 0) { return; }
    SetNuiFocusKeepInput(true)
})

on('twiliKeybinds:revokeFocusInputs', (origin) => {
    if (scriptsRevoking.indexOf(origin) != -1) { return; }
    scriptsRevoking.push(origin);
    SetNuiFocusKeepInput(false);
    console.log(scriptsRevoking)
})

RegisterCommand('keybinds', (source, args) => {
    if (GAME == FIVEM) {
        emit('chat:addMessage', { color: [255, 0, 0], multiline: true, args: ["twiliKeybinds", 'This is exclusive to RedM'] });
        return;
    }
    emit('chat:addMessage', {
        color: [255, 0, 0],
        multiline: true,
        args: ["twiliKeybinds", 'Opening keybinds menu.']
    });
    Invoke('toggleOverlay')
});
// }


let keyMaps = {
    
}


// This works
RegisterCommand('testcom', (source, args) => {
    establishFocus()
    // SetNuiFocus(false, false)
    // SetNuiFocusKeepInput(true)
    // ExecuteCommand('+twiliDebug:selectEntity')  // this works. I'll just do an inversion on the + and - for keypress
});

RegisterCommand('testcom2', (source, args) => {
    SetNuiFocus(false, false)
    SetNuiFocusKeepInput(false)
    // ExecuteCommand('+twiliDebug:selectEntity')  // this works. I'll just do an inversion on the + and - for keypress
});

exports("RegisterKeyMapping", (command, description, inputType, defaultKey) => {
    console.dir(command)
    console.dir(description)
    console.dir(inputType)
    console.dir(defaultKey)
    switch(GAME) {
        case FIVEM:  // basically, if FiveM, do normal stuff
            RegisterKeyMapping(command, description, inputType, defaultKey);
            break;
        default:  // but if not, lol we gotta do ALL the logic
            if (!command.startsWith('+') && !command.startsWith('-')) {
                console.log(`WARNING: "${command}" must start with a plus or minus sign. Due to malformed registration, this mapping will be voided.`);
                return;
            }
            keyMaps[command] = { description: description, inputType: inputType, defaultKey: defaultKey }
            Invoke('registerKeyMapping', [command, description, inputType, defaultKey])
            // console.log('debug')
    }
});


RegisterCommand('+testcom3', (source, args) => {
    emit('chat:addMessage', {
        color: [255, 0, 0],
        multiline: true,
        args: ["twiliKeybinds", 'Test command successfully ran.']
    });
    // SetNuiFocus(false, false)
    // SetNuiFocusKeepInput(true)
    // ExecuteCommand('+twiliDebug:selectEntity')  // this works. I'll just do an inversion on the + and - for keypress
});


exports.twiliKeybinds.RegisterKeyMapping('+testcom3', 'test', 'keyboard', 'K')



RegisterNuiCallback('twiliKeybinds:triggerCommand', (data, cb) => {
    cb(true)
    console.log(data)
    ExecuteCommand(data['command'])
    // ExecuteCommand('+twiliDebug:selectEntity')  // this works. I'll just do an inversion on the + and - for keypress
    // ExecuteCommand()
});


function Invoke(_type, data) {
	SendNUIMessage({
		callback: {
			type: _type,
			data: data,
		},
	})
}