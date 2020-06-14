# Manual

## Options

### Help
Show all the available commands

Example:
```
raptor-sync --help
raptor-sync -h
```

### Version
Show the installed version

Example:
```
raptor-sync --version
raptor-sync -v
```

### Source
The full path of the source directory to copy. This is mandatory if no config file is given.

CLI Example:
```
raptor-sync --source ~/path/to/source
raptor-sync -s ~/path/to/source
```

Config file example:
```json
{
  "sync": {
    "syncFolders" : [
      { 
        "source": "/path/to/source"
      }
    ]
  }
}
```

### Destination
The full path of the destination directory of the files to copy. This is mandatory if no config file is given.

CLI Example:
```
raptor-sync --destination ~/path/to/destination
raptor-sync -d ~/path/to/destination
```

Config file example:
```json
{
  "sync": {
    "syncFolders" : [
      { 
        "destination": "/path/to/destination"
      }
    ]
  }
}
```

### Delete source
After the the files are copied to the destination folder, remove them from the source folder.

CLI Example:
```
raptor-sync --delete-source
```

Config file example:
```json
{
  "sync": {
    "syncFolders" : [
      { 
        "deleteSource": true
      }
    ]
  }
}
```

### Dry run
Test run. Do not copy or remove files.

CLI Example:
```
raptor-sync --dry-run
```

This command is not available in the configuration file.

### History storage location
The full path of the storage location of the history file. This is mandatory if no config file is given.

CLI Example:
```
raptor-sync --history-storage ~/path/to/history
raptor-sync -i ~/path/to/history
```

Config file example:
```json
{
  "sync": {
  },
  "logging": { 
  },
  "historyFile": "/var/raptor"
}
```

### File types to copy
The type of files to copy. By default all files will be copied

CLI Example:
```
raptor-sync --history-storage ~/path/to/history
raptor-sync -i ~/path/to/history
```

Config file example:
```json
{
  "sync": {
    "syncFolders" : [
      { 
        "fileType": "jpg",
      }
    ]
  }
}
```

### Verbose mode
Put Raptor in verbose mode and show all log messages.

CLI Example:
```
raptor-sync --verbose
raptor-sync -V
```

There is no verbose mode in the config, you have to put it in info yourself.
Config file example:
```json
{
  "logging": { 
    "console": {
      "level": "info"
    },
    "file": {
      "level": "info",
      "path": "/tmp/log/raptor/raptorlog"
    }
  }
}
```

### Debug mode
Put Raptor in debug mode and show errors with stack traces.

CLI Example:
```
raptor-sync --debug-mode 
raptor-sync -D
```

Config file example:
```json
{
  "sync": {
  },
  "logging": { 
  },
  "debugMode": true
}
```

### Silent mode
Disable all the console output.

CLI Example:
```
raptor-sync --silent
raptor-sync -S
```

Config file example:
```json
{
  "sync": {
  },
  "logging": { 
  },
  "silentMode": true
}
```

### Force
Ignore the history file and always copy the files from source to destination.

CLI Example:
```
raptor-sync --force
raptor-sync -f
```

Config file example:
```json
{
  "sync": {
  },
  "logging": { 
  },
  "force": true
}
```

### Logfile
The full path of the logfile. This is mandatory if no config file is given.

CLI Example:
```
raptor-sync --log-file ~/path/to/logfile
raptor-sync -l ~/path/to/logfile
```

Config file example:
```json
{
  "logging": { 
    "console": {
      "level": "error"
    },
    "file": {
      "level": "info",
      "path": "/tmp/log/raptor/raptorlog"
    }
  }
}
```

### Config file
The full path of the config file to use. The config file will be used as a base. CLI parameters will override configurations.

CLI Example:
```
raptor-sync --config-file ~/path/to/config
raptor-sync -c ~/path/to/config
```

## Configuration file Options
All the CLI options can also be used in the configuration file. Use the `-c` option to pass the path of the config file.

The configuration contains the follow sections:
 - sync: Contains all the folders to sync
    - syncFolders: an array of folders to sync
 - logging: Contains the logging configuration
    - console: The console logging configuration
    - file: The file logging configuration 

The `cronShedule` is not available on CLI. Read this [guide](https://www.npmjs.com/package/cron) for more info about how to setup a cron pattern.

The `level` option is not available in CLI. The following levels are available:
 - debug
 - info
 - warning
 - error 

Example:
```json
{
  "sync": {
    "syncFolders" : [
      { 
        "source": "/path/to/source",
        "destination": "/path/to/destination",  
        "fileType": "jpg",
        "cronSchedule": "*/5 * * * * *"
      }
    ]
  },
  "logging": { 
    "console": {
      "level": "info"
    },
    "file": {
      "level": "info",
      "path": "/tmp/log/raptor/raptorlog"
    }
  },
  "silentMode": false,
  "debugMode": false,
  "force": false,
  "historyFile": "/var/raptor"
}
```