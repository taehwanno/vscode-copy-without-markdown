import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import normalizeNewline from 'normalize-newline';

const getDocPath = (p: string) => {
  return path.resolve(__dirname, '../../fixture', p);
};

export const getDocUri = (p: string) => {
  return vscode.Uri.file(getDocPath(p));
};

export const getFile = (fileName: string): Promise<any> =>
  new Promise((resolve, reject) => {
    fs.readFile(getDocPath(fileName), (err, data) => {
      err ? reject(err) : resolve(normalizeNewline(data.toString()));
    });
  });
