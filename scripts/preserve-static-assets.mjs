import { cp, mkdir, mkdtemp, readdir, rm, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Cached HTML can still refer to a previous build's hashed CSS and JavaScript.
// Carry those immutable files forward without replacing any current build files.
export async function preserveStaticAssets({ token, repository, output = 'out' }) {
  if (!token || !repository) throw new Error('GitHub credentials and repository are required.');
  const headers = { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', 'User-Agent': 'Plugin3D-Pages' };
  const apiRoot = `https://api.github.com/repos/${repository}`;
  async function api(endpoint) {
    const response = await fetch(apiRoot + endpoint, { headers });
    if (!response.ok) throw new Error(`GitHub artifact lookup failed (${response.status}).`);
    return response.json();
  }
  const { workflow_runs: runs } = await api('/actions/workflows/pages.yml/runs?status=success&branch=main&per_page=3');
  let copied = 0;
  async function merge(source, destination) {
    await mkdir(destination, { recursive: true });
    for (const entry of await readdir(source, { withFileTypes: true })) {
      const from = path.join(source, entry.name);
      const to = path.join(destination, entry.name);
      if (entry.isDirectory()) await merge(from, to);
      else if (entry.isFile()) { await cp(from, to, { force: false }); copied++; }
    }
  }
  for (const run of runs) {
    const { artifacts } = await api(`/actions/runs/${run.id}/artifacts`);
    const artifact = artifacts.find(item => item.name === 'github-pages' && !item.expired);
    if (!artifact) continue;
    const download = await fetch(apiRoot + `/actions/artifacts/${artifact.id}/zip`, { headers, redirect: 'manual' });
    if (download.status !== 302) throw new Error(`GitHub artifact download failed (${download.status}).`);
    const response = await fetch(download.headers.get('location'));
    if (!response.ok) throw new Error(`Pages archive download failed (${response.status}).`);
    const temporary = await mkdtemp(path.join(tmpdir(), 'plugin3d-assets-'));
    try {
      const zip = path.join(temporary, 'pages.zip');
      await writeFile(zip, Buffer.from(await response.arrayBuffer()));
      const unzip = process.platform === 'win32'
        ? spawnSync('tar', ['-xf', zip, '-C', temporary], { encoding: 'utf8' })
        : spawnSync('unzip', ['-q', zip, '-d', temporary], { encoding: 'utf8' });
      if (unzip.status !== 0) throw new Error('Could not extract the previous Pages artifact.');
      const extract = path.join(temporary, 'site');
      await mkdir(extract);
      const unpack = spawnSync('tar', ['-xf', path.join(temporary, 'artifact.tar'), '-C', extract], { encoding: 'utf8' });
      if (unpack.status !== 0) throw new Error('Could not unpack the previous Pages site.');
      await merge(path.join(extract, '_next', 'static'), path.resolve(output, '_next', 'static'));
    } finally {
      const resolved = path.resolve(temporary);
      if (path.dirname(resolved) !== path.resolve(tmpdir()) || !path.basename(resolved).startsWith('plugin3d-assets-')) throw new Error('Unexpected temporary archive path.');
      await rm(resolved, { recursive: true, force: true });
    }
  }
  console.log(`Preserved previous deployment assets (${copied} file references).`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await preserveStaticAssets({ token: process.env.GITHUB_TOKEN, repository: process.env.GITHUB_REPOSITORY });
}
