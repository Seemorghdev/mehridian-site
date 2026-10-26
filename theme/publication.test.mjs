import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const markdown = directory => readdirSync(directory, { withFileTypes: true }).flatMap(entry =>
  entry.isDirectory() ? markdown(new URL(`${entry.name}/`, directory)) :
    entry.name.endsWith('.md') ? [new URL(entry.name, directory)] : []);

test('approved published pages do not retain private-review status or instructions', () => {
  const pages = markdown(new URL('content/', root));
  assert.equal(pages.length, 22);
  for (const page of pages) {
    const text = readFileSync(page, 'utf8');
    assert.match(text, /^visibility: public$/m, page.pathname);
    assert.match(text, /^status: published$/m, page.pathname);
    assert.doesNotMatch(text, /private candidate for owner review|require owner review before public release|status: review-candidate/i, page.pathname);
  }
  const story = readFileSync(new URL('content/research/project03/index.md', root), 'utf8');
  assert.match(story, /historical schema-v1\.1 comparison, not a current audit/);
});
