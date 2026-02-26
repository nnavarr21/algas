'use strict';

const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const distPath = path.resolve(projectRoot, 'dist');

const filesToCopy = [
    'index.html',
    'acerca.html',
    'productos.html',
];

const directoriesToCopy = [
    'assets',
    'css',
    'img',
    'js',
    'languages',
];

function removeDist() {
    fs.rmSync(distPath, { recursive: true, force: true });
    fs.mkdirSync(distPath, { recursive: true });
}

function copyFile(relativePath) {
    const source = path.resolve(projectRoot, relativePath);
    const destination = path.resolve(distPath, relativePath);

    if (!fs.existsSync(source)) {
        return;
    }

    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.copyFileSync(source, destination);
}

function copyDirectory(relativePath) {
    const source = path.resolve(projectRoot, relativePath);
    const destination = path.resolve(distPath, relativePath);

    if (!fs.existsSync(source)) {
        return;
    }

    fs.cpSync(source, destination, { recursive: true });
}

function build() {
    removeDist();
    filesToCopy.forEach(copyFile);
    directoriesToCopy.forEach(copyDirectory);
    console.log('Build completed in dist/');
}

build();
