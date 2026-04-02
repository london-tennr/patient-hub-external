# FileUpload Component

## Overview

The FileUpload component is a versatile file input component that supports both drag-and-drop and click-to-browse interactions. It provides built-in file type validation, size restrictions, and visual feedback during drag operations. The component can be rendered in two modes: a full drag-and-drop area or a compact button-only mode.

## What It Is

The FileUpload component is a self-contained file input component that:

- **Handles File Selection**: Supports both drag-and-drop and traditional file browser selection
- **Validates Files**: Automatically filters files by type and size (max 50MB)
- **Provides Visual Feedback**: Shows visual cues during drag operations
- **Offers Flexible Display**: Can render as a full drop zone or compact button
- **Supports Multiple Files**: Allows users to select multiple files at once
- **Reports Errors**: Provides error callbacks for invalid files

### Key Features

- **Dual Input Modes**: Drag-and-drop area or compact button mode
- **File Type Filtering**: Configurable accepted file types with sensible defaults
- **Size Validation**: Built-in 50MB file size limit
- **Drag Visual Feedback**: Visual state changes during drag operations
- **Accessible**: Standard file input semantics for screen readers
- **Multiple Selection**: Support for selecting multiple files simultaneously

## When to Use

Use the FileUpload component when you need to:

1. **Document Uploads**: Accept files from users in forms or workflows

   - Form attachments
   - Document submissions
   - Image uploads
   - Data file imports

2. **Bulk File Operations**: Allow users to upload multiple files at once

   - Batch document processing
   - Multi-file imports
   - Archive uploads
   - Asset management

3. **Drag-and-Drop Experience**: Provide a modern, intuitive file upload interface

   - Content management systems
   - File sharing interfaces
   - Document management
   - Media libraries

4. **Constrained File Types**: Restrict uploads to specific file formats

   - PDF-only uploads
   - Image uploads (JPEG, PNG)
   - Data imports (CSV, JSON, XLSX)
   - Document workflows

5. **Space-Constrained Interfaces**: Use the compact mode when space is limited

   - Inline form fields
   - Toolbars
   - Compact dialogs
   - Mobile interfaces

## When NOT to Use

Avoid using the FileUpload component when:

1. **Single File Selection**: You need more control over single file selection with preview

   - Profile picture uploads (use a dedicated Avatar upload component)
   - Logo uploads with cropping (use an image editor component)
   - File replacement workflows (consider a specialized component)

2. **Large File Uploads**: Files exceed the 50MB limit

   - Video uploads (use a chunked upload component)
   - Large dataset uploads (use a resumable upload solution)
   - Backup files (use a dedicated large file handler)

3. **Complex Validation**: You need more sophisticated validation beyond type and size

   - Content validation (use a custom upload handler)
   - Duplicate detection (add custom logic)
   - File content scanning (use server-side validation)

4. **Progress Tracking**: You need to show upload progress

   - Large file uploads (use a component with progress indicators)
   - Slow network scenarios (use a resumable upload component)

5. **Camera/Device Integration**: You need to capture from camera or other devices

   - Profile photos (use a camera capture component)
   - Document scanning (use a scanner integration)
   - Signature capture (use a signature component)

## Usage Example

```tsx
import { FileUpload } from "@tennr/lasso/file-upload";

function MyComponent() {
  const handleFilesChange = (files: File[]) => {
    console.log("Selected files:", files);
    // Process the files
  };

  const handleError = (error: Error) => {
    console.error("Upload error:", error.message);
  };

  return <FileUpload onFilesChange={handleFilesChange} onError={handleError} />;
}
```

### Example with Custom File Types

```tsx
import { AcceptedFileTypes, FileUpload } from "@tennr/lasso/file-upload";

<FileUpload
  onFilesChange={handleFilesChange}
  inputTypes={[AcceptedFileTypes.PDF, AcceptedFileTypes.DOCX]}
/>;
```

### Example with Compact Mode

```tsx
import { FileUpload } from "@tennr/lasso/file-upload";

<FileUpload onFilesChange={handleFilesChange} hideDragAndDrop={true} />;
```

### Example in a Form

```tsx
import { useState } from "react";

import { AcceptedFileTypes, FileUpload } from "@tennr/lasso/file-upload";

function DocumentUploadForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  return (
    <form>
      <label>Upload Documents</label>
      <FileUpload
        onFilesChange={setFiles}
        onError={(err) => setError(err.message)}
        inputTypes={[
          AcceptedFileTypes.PDF,
          AcceptedFileTypes.JPEG,
          AcceptedFileTypes.PNG,
        ]}
      />
      {error && <p className="text-red-500">{error}</p>}
      {files.length > 0 && (
        <ul>
          {files.map((file) => (
            <li key={file.name}>{file.name}</li>
          ))}
        </ul>
      )}
    </form>
  );
}
```

## Props Reference

### FileUpload

- `onFilesChange`: `(files: File[]) => void` - **Required**. Callback triggered when valid files are selected
- `onError`: `(error: Error) => void` - Callback triggered when file validation fails (invalid type or size)
- `hideDragAndDrop`: `boolean` - If true, shows only a compact button instead of the full drag-and-drop area (default: false)
- `inputTypes`: `AcceptedFileType[]` - Array of accepted file types (default: PDF, JPEG, PNG, TIF/TIFF, DOCX, CSV)
- `disabled`: `boolean` - If true, disables the file input (default: false)

### AcceptedFileTypes

The following file types are supported:

- `AcceptedFileTypes.PDF` - PDF documents (.pdf)
- `AcceptedFileTypes.DOCX` - Word documents (.doc, .docx)
- `AcceptedFileTypes.TXT` - Plain text files (.txt)
- `AcceptedFileTypes.JPEG` - JPEG images (.jpg, .jpeg)
- `AcceptedFileTypes.PNG` - PNG images (.png)
- `AcceptedFileTypes.XLSX` - Excel spreadsheets (.xlsx)
- `AcceptedFileTypes.SVG` - SVG images (.svg)
- `AcceptedFileTypes.JSON` - JSON files (.json)
- `AcceptedFileTypes.CSV` - CSV files (.csv)
- `AcceptedFileTypes["TIF/TIFF"]` - TIFF images (.tiff)
- `AcceptedFileTypes.ZIP` - ZIP archives (.zip)

### Document Interface

The component exports a `Document` interface for representing uploaded files:

```typescript
interface Document {
  name: string;
  id: string;
  file: File;
  createdAt: Date;
}
```

## File Validation

The component automatically validates files against:

1. **File Type**: Only files matching the configured `inputTypes` are accepted
2. **File Size**: Maximum file size is 50MB (52,428,800 bytes)

Invalid files are filtered out and the `onError` callback is triggered with an error message.

## Accessibility

The FileUpload component includes accessibility features:

- Uses a standard `<input type="file">` element for native browser support
- Keyboard accessible through the button and input
- Screen reader announcements for file selection
- Visual feedback for drag-and-drop interactions
- Clear labeling for the upload action

## Related Components

- For displaying uploaded files, use a List or Table component
- For progress tracking during upload, add a Progress component
- For error messages, use the Toast component
- For form integration, combine with Form and Label components
