import { cp, mkdir, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import * as sass from 'sass';

const outputDirectory = 'public';
const htmlFiles = (await readdir('.')).filter((file) => file.endsWith('.html'));

await rm(outputDirectory, { force: true, recursive: true });
await mkdir(path.join(outputDirectory, 'styles'), { recursive: true });

const stylesheet = sass.compile('styles/main.scss', {
  sourceMap: false,
  style: 'compressed'
});

await Promise.all([
  ...htmlFiles.map((file) => cp(file, path.join(outputDirectory, file))),
  cp('images', path.join(outputDirectory, 'images'), { recursive: true }),
  cp('script/main.js', path.join(outputDirectory, 'script/main.js')),
  writeFile(path.join(outputDirectory, 'styles/main.css'), stylesheet.css)
]);
