# coc-F5

bind F5 with different filetype and list the preset commands to run.

## Introduction

this plugin will let F5 to exhale a list with certain commands to execute.

1. firstly, the plugin will detect the .cocF5.json in root directory and load it.
2. if there is not file satisfying step 1, the plugin will detect configuration of this filetype in coc configuration.
3. if there is not configuration record about this filetype, the plugin will use the default configuration of this filetype.
4. if there is not default configuration about this filetype, you will obtain an empty list.

and i desire you to make a branch and pr the missing filetype configuration, or just show your configuration about the missing
filetype in issues.

## Install

`:CocInstall coc-F5`

## Keymaps
this should be set on you own.

`nmap <silent> <F5> :CocList F5<CR>`

## Lists

`:CocList F5`

to create or update the configuration.
`:CocCommand coc_F5.configurate`

## Configurations

file: .cocF5.json

the * in filetype will be load by all filetype.
``` json
{
    "name": "coc_f5",
    "filetype": {
        "*": [
            {
                "name": "test3",
                "description": "it is a test command",
                "command": "set filetype?"
            }
        ],
        "typescript": [
            {
                "name": "test1",
                "description": "it is a test command",
                "command": "set filetype?"
            },
            {
                "name": "test2",
                "description": "it is a test command",
                "command": "!screenfetch"
            }
        ]
    }
}
```

## License

MIT

## Issue
not write, just conquer the name.

---

> This extension is created by [create-coc-extension](https://github.com/fannheyward/create-coc-extension)

## Next
add default method in different filetype respectively.
