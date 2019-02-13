import * as vscode from 'vscode';
import * as assert from 'assert';

import { getDocUri, getFile } from './helper';

describe('Extension Tests', () => {
  it('should copy and convert text when language mode is markdown', async () => {
    const actual = await readClipboardText('markdown-before.md', '');
    const expected = await getFile('markdown-after.md');
    assert.equal(actual, expected);
  });

  it('should not copy text when language mode is not markdown', async () => {
    const expected = 'No conversion';
    const actual = await readClipboardText('text.txt', expected);
    assert.equal(actual, expected);
  });
});

const readClipboardText = async (path: string, initialClipboardText: string): Promise<string> => {
  const docUri = getDocUri(path);
  const document = await vscode.workspace.openTextDocument(docUri);
  await vscode.env.clipboard.writeText(initialClipboardText);
  await vscode.window.showTextDocument(document);
  await vscode.commands.executeCommand('editor.action.selectAll');
  await vscode.commands.executeCommand('copy-without-markdown');
  const text = await vscode.env.clipboard.readText();
  return text;
};
