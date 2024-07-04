import React, { useState, useRef } from 'react';
import { Menu, MenuItem, TextField } from '@mui/material';

type FileType = 'file' | 'folder';

interface File {
    name: string;
    type: FileType;
    children?: File[];
}

const FileExplorer: React.FC = () => {
    const [structure, setStructure] = useState<File[]>([]);
    const [currentPath, setCurrentPath] = useState<File[]>([]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [contextMenuFile, setContextMenuFile] = useState<File | null>(null);
    const [editingFile, setEditingFile] = useState<File | null>(null);
    const [newName, setNewName] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const [mousePosition, setMousePosition] = useState<{ mouseX: number, mouseY: number }>({ mouseX: 0, mouseY: 0 });

    const handleContextMenu = (event: React.MouseEvent, file: File | null) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget as HTMLElement);
        if (file !== null && file !== undefined) {
            console.log('file', file);
            setContextMenuFile(file); // Set the file that was right-clicked
        }
        setMousePosition({ mouseX: event.clientX, mouseY: event.clientY });
    };

    const handleClose = () => {
        setAnchorEl(null);
        setContextMenuFile(null);
    };

    const handleAddFile = (isFolder: boolean) => {
        const newFile: File = {
            name: '',
            type: isFolder ? 'folder' : 'file',
            children: isFolder ? [] : undefined,
        };

        const updatedStructure = [...structure];
        let target = updatedStructure;

        currentPath.forEach(folder => {
            const foundFolder = target.find(f => f.name === folder.name && f.type === 'folder');
            if (foundFolder && foundFolder.children) {
                target = foundFolder.children;
            }
        });

        target.push(newFile);
        setStructure(updatedStructure);
        setEditingFile(newFile); // Set the new file to be in editing mode
        setNewName('');
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };

    const handleDelete = () => {
        if (contextMenuFile) {
            console.log('Deleting file:', contextMenuFile.name);
            const updatedStructure = deleteFileOrFolder(structure, contextMenuFile);
            setStructure(updatedStructure);
        }
        handleClose();
    };

    const deleteFileOrFolder = (files: File[], targetFile: File): File[] => {
        return files.filter(file => {
            if (file === targetFile) return false;
            if (file.type === 'folder' && file.children) {
                file.children = deleteFileOrFolder(file.children, targetFile);
            }
            return true;
        });
    };

    const handleRename = () => {
        if (contextMenuFile) {
            console.log('Renaming file:', contextMenuFile.name);
            setEditingFile(contextMenuFile); // Set the file to be edited
            setNewName(contextMenuFile.name);
            setTimeout(() => {
                inputRef.current?.focus();
            }, 0);
        }
        handleClose();
    };

    const handleRenameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewName(e.target.value);
    };

    const handleRenameSubmit = () => {
        if (editingFile) {
            console.log('editing file:', editingFile.name);
            if (newName.trim() === '') {
                setEditingFile(null);
                return;
            }
            const updatedStructure = renameFileOrFolder(structure, editingFile, newName);
            setStructure(updatedStructure);
            setEditingFile(null);
        }
    };

    const renameFileOrFolder = (files: File[], targetFile: File, newName: string): File[] => {
        return files.map(file => {
            if (file === targetFile) {
                return { ...file, name: newName };
            }
            if (file.type === 'folder' && file.children) {
                file.children = renameFileOrFolder(file.children, targetFile, newName);
            }
            return file;
        });
    };

    const handleNavigate = (folder: File) => {
        setCurrentPath([...currentPath, folder]);
    };

    const handleBack = () => {
        const updatedPath = [...currentPath];
        updatedPath.pop();
        setCurrentPath(updatedPath);
    };

    const renderFiles = (files: File[]) => {
        return files.map(file => (
            <div
                key={file.name || 'new-file'}
                onContextMenu={(event) => handleContextMenu(event, file)} // Attach the context menu event
                onDoubleClick={() => file.type === 'folder' && handleNavigate(file)}
                className="cursor-pointer p-2"
            >
                {editingFile === file ? (
                    <TextField
                        value={newName}
                        onChange={handleRenameChange}
                        onBlur={handleRenameSubmit}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleRenameSubmit();
                            }
                        }}
                        inputRef={inputRef}
                        size="small"
                        variant="outlined"
                        autoFocus
                    />
                ) : (
                    file.name || 'New File/Folder'
                )}
            </div>
        ));
    };

    let currentFiles = structure;
    currentPath.forEach(folder => {
        const foundFolder = currentFiles.find(f => f.name === folder.name && f.type === 'folder');
        if (foundFolder && foundFolder.children) {
            currentFiles = foundFolder.children;
        }
    });

    return (
        <div className="p-4" onContextMenu={(event) => handleContextMenu(event, null)}>
            <div className="mb-4">
                <button onClick={handleBack} disabled={currentPath.length === 0}>
                    Back
                </button>
                <button onClick={() => handleAddFile(false)} className="ml-4">
                    New File
                </button>
                <button onClick={() => handleAddFile(true)} className="ml-4">
                    New Folder
                </button>
            </div>
            <div className="border p-4">
                {currentFiles.length > 0 ? renderFiles(currentFiles) : <div>No files or folders</div>}
            </div>
            <Menu
                anchorReference="anchorPosition"
                anchorPosition={mousePosition.mouseY !== 0 ? { top: mousePosition.mouseY, left: mousePosition.mouseX } : undefined}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleRename} disabled={!contextMenuFile}>Rename</MenuItem>
                <MenuItem onClick={handleDelete} disabled={!contextMenuFile}>Delete</MenuItem>
            </Menu>
        </div>
    );
};

export default FileExplorer;
