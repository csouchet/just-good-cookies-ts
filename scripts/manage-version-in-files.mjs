/**
 * Copyright 2022 Céline Souchet
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 *
 * This project is a fork of the original just-good-cookies project of Francesco Mugnai.
 */

// We are not installing node dependencies when running the GitHub workflow '.github/workflows/release.yml'
// So please do not import code that is not provided by the node runtime. Otherwise, update the GitHub workflow definition
import { readFileSync, writeFileSync } from 'node:fs';

if (process.env.IS_RELEASING) {
  updateVersionInFilesOnRelease();
} else {
  manageVersionSuffixInFiles();
}

function updateVersionInFilesOnRelease() {
  log('Updating version in files for release');
  const currentVersion = getCurrentVersion();
  log('Current version', currentVersion);
  updateVersionInSourceFile(currentVersion);
  log('Files have been updated');
}

function manageVersionSuffixInFiles() {
  log('Managing version suffix in files');
  const currentVersion = getCurrentVersion();
  log('Current version', currentVersion);

  const newVersion = addOrRemoveVersionSuffix(currentVersion);
  log('New version', newVersion);

  updateVersionInNpmFile('./package.json', newVersion);
  updateVersionInNpmFile('./package-lock.json', newVersion);
  updateVersionInSonarFile(newVersion);
  updateVersionInSourceFile(newVersion);

  log('Files have been updated');
}

function log(...data) {
  // eslint-disable-next-line no-console
  console.info(...data);
}

function readFileContent(path) {
  return readFileSync(path, 'utf8').toString();
}

function getCurrentVersion() {
  const json = readFileContent('./package.json');
  const pkg = JSON.parse(json);
  return pkg.version;
}

function addOrRemoveVersionSuffix(version) {
  return version.endsWith('-post') ? version.replace(/-post$/, '') : `${version}-post`;
}

function updateVersionInNpmFile(path, newVersion) {
  const json = readFileContent(path);
  const pkg = JSON.parse(json);
  pkg.version = newVersion;
  writeFileSync(path, JSON.stringify(pkg, null, 2) + '\n');
}

function updateVersionInSonarFile(newVersion) {
  const path = './sonar-project.properties';
  const content = readFileContent(path);
  // replace the 1st occurrence, is ok as a key appears only once in the file
  const updatedContent = content.replace(/sonar\.projectVersion=.*/, `sonar.projectVersion=${newVersion}`);
  writeFileSync(path, updatedContent);
}

function updateVersionInSourceFile(newVersion) {
  const path = 'src/component/version.ts';
  const content = readFileContent(path);
  // replace the 1st occurrence, is ok as the constant appears only once in the file
  const updatedContent = content.replace(/const libVersion =.*/, `const libVersion = '${newVersion}';`);
  writeFileSync(path, updatedContent);
}
