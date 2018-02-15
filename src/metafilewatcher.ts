'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

let watcher: vscode.FileSystemWatcher;
let justCreated: vscode.Uri | void;
export async function activate(context: vscode.ExtensionContext) {
    console.log("Activate Unity Meta files watcher!")

    watcher = vscode.workspace.createFileSystemWatcher("**/*.*");

    watcher.onDidCreate(uri => {
        //Ignore meta file
        if (uri.fsPath.endsWith(".meta")) {
            return
        }

        //console.log("OnCreate " + uri)
        setTimeout(() => justCreated = undefined, 200);
        justCreated = uri
    });

    watcher.onDidDelete(uri => {
        //Ignore meta file
        if (uri.fsPath.endsWith(".meta")) {
            return
        }

        //console.log("OnDelete " + uri)
        if (justCreated != undefined) {
            var justCreatedFsPath = justCreated.fsPath;
            var justDeletedFsPath = uri.fsPath;
            var justCreatedPath = path.parse(justCreatedFsPath);
            var justDeletedPath = path.parse(justDeletedFsPath);

            if (justCreatedPath.dir == justDeletedPath.dir) {
                //change file name
                //console.log("FileName changed from " + justDeletedPath.base + " " + justCreatedPath.base)
                fs.exists(justDeletedFsPath + ".meta", (exist: boolean) => {
                    if (exist) {
                        fs.rename(justDeletedFsPath + ".meta", justCreatedFsPath + ".meta", () => { })
                    }
                });
            } else if (justCreatedPath.base == justDeletedPath.base) {
                //change file location
                //console.log("File moved from " + justDeletedPath.dir + " " + justCreatedPath.dir)
                fs.exists(justDeletedFsPath + ".meta", (exist: boolean) => {
                    if (exist) {
                        fs.rename(justDeletedFsPath + ".meta", justCreatedFsPath + ".meta", () => { })
                    }
                });
            }
        } else {
            //Just normal delete
            //console.log("File delete from " + justDeletedPath.dir)
            fs.exists(uri.fsPath + ".meta", (exist: boolean) => {
                if (exist) {
                    fs.unlink(uri.fsPath + ".meta", () => { })
                }
            });
        }
    });

    //watcher.onDidChange(uri => {
    //    console.log("OnChange " + uri)
    //});
}

export async function deactivate() {
    if (watcher != undefined) {
        watcher.dispose()
    }
}