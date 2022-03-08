# tomcat-deploy

Deploy your static content to your Tomcat instance from build agent (or wherever else).

# Installation

```bash
npm install tomcat-deploy
```

# Usage

The tomcat-deploy offers both simple library and executable.

## Executable

You can ask the executable for help. Commands are the same as library methods, arguments are the same as command options. Arguments can be also specified by environment variables.

```bash
tomcat-deploy --help
```

```bash
tomcat-deploy command warfile
```

## Library

All methods are expecting list of options. Some of them also need a path to the warfile.

### .deploy(warfile, options)

Deploys the warfile. Fails on already deployed.

### .undeploy(options)

Undeploys the application on path specified in options. Fails on not deployed.

### .query(options)

Asks the Tomcat manager if the path specified in options is deployed.

### .redeploy(warfile, options)

Runs query, undeploy and deploy sequence.

### Options [object]

#### hostname [string, required]

The hostname of the Tomcat instance without protocol and port nuber. Executable reads env variable TOMCAT_HOSTNAME and argument --hostname.

#### login [string, required]

The user login name for the Tomcat instance. Executable reads env variable TOMCAT_LOGIN and argument --login.

#### path [string, required]

Tomcat will deploy the warfile application on this path. Executable reads env variable TOMCAT_PATH and argument --path.

#### password [string]

The user password for the Tomcat instance user. Executable reads env variable TOMCAT_PASSWORD and argument --password.

#### port [number]

The port used to run the Tomcat instance manager, default is 80. Executable reads env variable TOMCAT_PORT and argument --port.

#### deployPath [string], listPath [string] undeployPath [string]

These are for internal, but can be overriden. Calls the tomcat manager API are done to these paths. Check the source for default values.
