import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

const getDocPath = (p: string) => {
  return path.resolve(__dirname, '../../fixture', p);
};

export const getDocUri = (p: string) => {
  return vscode.Uri.file(getDocPath(p));
};

export const getFile = (fileName: string) =>
  new Promise((resolve, reject) => {
    fs.readFile(getDocPath(fileName), (err, data) => {
      err ? reject(err) : resolve(data.toString().replace(/\r/g, ''));
    });
  });
