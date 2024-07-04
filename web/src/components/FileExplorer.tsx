import React, { useState, useRef, useEffect } from 'react';
import { Menu, MenuItem, TextField, Grid, IconButton, Breadcrumbs, Link } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';

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
    let [newName, setNewName] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const [mousePosition, setMousePosition] = useState<{ mouseX: number, mouseY: number }>({ mouseX: 0, mouseY: 0 });

    useEffect(() => {
        if (editingFile && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editingFile]);

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

    const generateUniqueName = (baseName: string, files: File[]): string => {
        let newName = baseName;
        let counter = 1;
        const fileNames = files.map(file => file.name);
        while (fileNames.includes(newName)) {
            newName = `${baseName} (${counter})`;
            counter++;
        }
        return newName;
    };

    const handleAddFile = (isFolder: boolean) => {
        const newFile: File = {
            name: generateUniqueName('New', structure),
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

    const handleRenameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewName(e.target.value);
    };

    const handleRenameSubmit = () => {
        if (editingFile) {
            console.log('editing file:', editingFile.name);
            if (newName.trim() === '') {
                newName = generateUniqueName('New', structure)
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

    const handleNavigateTo = (index: number) => {
        setCurrentPath(currentPath.slice(0, index + 1));
    };

    const handleBack = () => {
        const updatedPath = [...currentPath];
        updatedPath.pop();
        setCurrentPath(updatedPath);
    };

    const renderFiles = (files: File[]) => {
        return (
            <Grid container spacing={2}>
                {files.map(file => (
                    <Grid item key={file.name || 'new-file'}>
                        <div
                            onContextMenu={(event) => handleContextMenu(event, file)}
                            onDoubleClick={() => file.type === 'folder' && handleNavigate(file)}
                            className="cursor-pointer max-w-[100px] truncate flex flex-col items-center"
                        >
                            <IconButton>
                                {file.type === 'folder' ? <FolderIcon fontSize="large" /> : <InsertDriveFileIcon fontSize="large" />}
                            </IconButton>
                            <div className="truncate" style={{ marginTop: '8px', maxWidth: '100px' }}>
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
                                        style={{ maxWidth: '90px' }}
                                    />
                                ) : (
                                    <span className="truncate">{file.name || 'New File/Folder'}</span>
                                )}
                            </div>
                        </div>
                    </Grid>
                ))}
            </Grid>
        );
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
            <div className="mb-4 flex space-x-4 justify-end">
                <IconButton onClick={handleBack} disabled={currentPath.length === 0}>
                    <ArrowBackIcon/>
                </IconButton>
                <IconButton onClick={() => handleAddFile(false)}>
                    <NoteAddIcon/>
                </IconButton>
                <IconButton onClick={() => handleAddFile(true)}>
                    <CreateNewFolderIcon/>
                </IconButton>
            </div>
            <div className="mb-4">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" onClick={() => setCurrentPath([])} style={{cursor: 'pointer'}}>
                        Home
                    </Link>
                    {currentPath.map((folder, index) => (
                        <Link
                            color="inherit"
                            onClick={() => handleNavigateTo(index)}
                            style={{cursor: 'pointer'}}
                            key={folder.name}
                        >
                            {folder.name}
                        </Link>
                    ))}
                </Breadcrumbs>
            </div>
            <div className="border p-4">
                {currentFiles.length > 0 ? renderFiles(currentFiles) : <div>No files or folders</div>}
            </div>
            <Menu
                anchorReference="anchorPosition"
                anchorPosition={mousePosition.mouseY !== 0 ? {
                    top: mousePosition.mouseY,
                    left: mousePosition.mouseX
                } : undefined}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleDelete} disabled={!contextMenuFile}>Delete</MenuItem>
            </Menu>
        </div>
    );
};

export default FileExplorer;
