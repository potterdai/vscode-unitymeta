"use strict";
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as metafilewatcher from "./metafilewatcher";
import * as fs from "fs";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    if (
        fs.existsSync(vscode.workspace.rootPath + "/Library") &&
        fs.existsSync(vscode.workspace.rootPath + "/Assets") &&
        fs.existsSync(vscode.workspace.rootPath + "/ProjectSettings")
    ) {
        metafilewatcher.activate(context);
    }
}

// this method is called when your extension is deactivated
export function deactivate() {
    metafilewatcher.deactivate();
}
