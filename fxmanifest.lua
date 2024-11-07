fx_version 'cerulean'
games { 'gta5', 'rdr3' }

rdr3_warning 'I acknowledge that this is a prerelease build of RedM, and I am aware my resources *will* become incompatible once RedM ships.'

author 'Elena Winters'
description 'Central keybinds for all my projects. Also implements a keybind system for RedM.'
version '24.11.6'

dependencies {
    'twiliCore'
}

ui_page 'html/index.html'

files {
    'html/index.html',
    'html/style.css',
    'html/script.js'
}

shared_scripts {
    '@twiliCore/shared/u_common.js'
}

-- client_script 'twiliClient.lua'

client_scripts {
    '@twiliCore/client/c_globals.js',
    'client/c_keybinds.js'
}

