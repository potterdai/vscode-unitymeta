'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as metafilewatcher from './metafilewatcher';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    vscode.workspace.findFiles("**/*.meta", null, 1).then(ps => {
        if (ps.length > 0) {
            //Is Unity Project
            metafilewatcher.activate(context);
        }
    })
}

// this method is called when your extension is deactivated
export function deactivate() {
    metafilewatcher.deactivate();
}