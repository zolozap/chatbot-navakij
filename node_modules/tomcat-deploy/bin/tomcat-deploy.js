#!/usr/bin/env node

const extend = require('extend');
const minimist = require('minimist');
const path = require('path');

const tomcat = require('../dist');

const scriptName = path.basename(process.argv[1]);

const useArgs = (envArgs, cliArgs) => {
  const uglyArgs = extend({}, envArgs, cliArgs);
  return Object.keys(uglyArgs)
    .filter(argKey => !!uglyArgs[argKey])
    .reduce((prev, argKey) => extend(prev, { [argKey]: uglyArgs[argKey] }), {});
};

const validateArgs = (command, warfile, args) => {
  if (!command) {
    process.stderr.write('Command is required. See --help\n');
    process.exit(1);
  }

  if (command === 'deploy' || command === 'redeploy') {
    if (!warfile) {
      process.stderr.write('Warfile is required. See --help\n');
      process.exit(2);
    }
  }

  if (!args.hostname) {
    process.stderr.write('Host name is required. See --help\n');
    process.exit(3);
  }

  if (!args.login) {
    process.stderr.write('Login is required. See --help\n');
    process.exit(4);
  }

  if (!args.path) {
    process.stderr.write('Path is required. See --help\n');
    process.exit(5);
  }
};

const args = useArgs(
  {
    deployPath: process.env.TOMCAT_DEPLOY_PATH,
    hostname: process.env.TOMCAT_HOSTNAME,
    listPath: process.env.TOMCAT_LIST_PATH,
    login: process.env.TOMCAT_LOGIN,
    password: process.env.TOMCAT_PASSWORD,
    port: process.env.TOMCAT_PORT,
    path: process.env.TOMCAT_PATH,
    undeployPath: process.env.TOMCAT_UNDEPLOY_PATH,
  },
  minimist(process.argv.slice(2))
);

const command = args._[0];
const warfile = process.env.TOMCAT_WARFILE || args._[1];

if (args.help) {
  process.stdout.write(`${scriptName} - Deploy application to Tomcat using Tomcat manager http REST API\n`);
  process.stdout.write('\n');
  process.stdout.write(`Usage: ${scriptName} command warfile [--hostname example.com] [--port 80] [--path /example] [--login username] [--password password] [--protocol http:] [--deployPath /manager/text/deploy] [--listPath /manager/text/list] [--undeployPath /manager/text/undeploy]\n`);
  process.stdout.write('\n');
  process.stdout.write('Commands:\n');
  process.stdout.write('  deploy - deploys application on tomcat\n');
  process.stdout.write('  query - runs a query on tomcat manger if the application is deployed\n');
  process.stdout.write('  redeploy - query, undeploy and deploy\n');
  process.stdout.write('  undeploy - undeploys application from tomcat\n');
  process.stdout.write('\n');
  process.stdout.write('Options:\n');
  process.stdout.write('  --hostname <string> Host name of the target tomcat server\n');
  process.stdout.write('  --port <number> Port of the target tomcat server\n');
  process.stdout.write('  --path <string> Path to deploy this application on Tomcat. Typically the name of the warfile without extension\n');
  process.stdout.write('  --login <string> Username on Tomcat manager\n');
  process.stdout.write('  --password <string> Password on Tomcat manager\n');
  process.stdout.write('\n');
  process.exit(0);
}

validateArgs(command, warfile, args);

if (command === 'redeploy') {
  tomcat.redeploy(warfile, args).then(() => {
    process.stdout.write(`${args.path} was successfully redeployed on ${args.hostname}\n`);
  });
} else if (command === 'deploy') {
  tomcat.deploy(warfile, args).then(() => {
    process.stdout.write(`${args.path} was successfully deployed on ${args.hostname}\n`);
  });
} else if (command === 'undeploy') {
  tomcat.undeploy(args).then(() => {
    process.stdout.write(`${args.path} was successfully undeployed from ${args.hostname}\n`);
  });
} else if (command === 'query') {
  tomcat.query(args).then((response) => {
    process.stdout.write(response ?
      `${args.path} is deployed on ${args.hostname}\n` :
      `${args.path} is not deployed\n`
    );
  });
}
