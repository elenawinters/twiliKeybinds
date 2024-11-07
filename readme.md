# NOTICE
This is still a work in progress. You can register keybinds using CFX syntax and it will load and they will work, however, rebinding is currently not implemented, and is being worked on.

# twiliKeybinds

Central script for managing keybinds

Introduces a custom keybind system for RedM

# Quirks - REDM

When using this script, it needs to be managed.

If you need to take control over the NUI, please fire off specific events

- twiliKeybinds:revokeFocusInputs: Turns off the keyboard input registering system.
- twiliKeybinds:establishFocusInputs: Let's the script register keyboard inputs.

If you have to open a NUI window that needs control, please revoke focus inputs on this scripts.
When you no longer need control, please establish focus inputs.
