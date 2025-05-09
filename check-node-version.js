const semver = require('semver');

const version = 20;
const range = `>=${version}.0.0 <${version + 1}.0.0`;
if (!semver.satisfies(process.version, range)) {
  console.log(
    `ERROR: Required node version ${version} not satisfied with current version ${process.version}.\n` +
      `Change it running: nvm use ${version} or nvm alias default ${version}`,
  );
  process.exit(1);
} else {
  console.log(
    `OK: Required node version ${version} satisfies with current version ${process.version}.`,
  );
}
