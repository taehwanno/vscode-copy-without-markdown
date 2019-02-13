import * as vscode from 'vscode';
import removeMarkdown from 'remove-markdown';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('copy-without-markdown', async () => {
    const { activeTextEditor } = vscode.window;

    if (activeTextEditor && vscode.languages.match('markdown', activeTextEditor.document)) {
      await vscode.commands.executeCommand('editor.action.clipboardCopyAction');
      const text = await vscode.env.clipboard.readText();
      await vscode.env.clipboard.writeText(removeMarkdown(text));
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
