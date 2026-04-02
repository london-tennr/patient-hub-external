/**
 * Represents an uploaded document with metadata.
 *
 * @property name - The display name of the document
 * @property id - Unique identifier for the document
 * @property file - The underlying File object
 * @property createdAt - Timestamp when the document was uploaded
 */
export interface Document {
    name: string;
    id: string;
    file: File;
    createdAt: Date;
}
/**
 * Enum of accepted file types for the FileUpload component.
 * Use these values when configuring the `inputTypes` prop to restrict
 * which file formats users can upload.
 *
 * @example
 * ```tsx
 * <FileUpload
 *   inputTypes={[AcceptedFileTypes.PDF, AcceptedFileTypes.DOCX]}
 *   onFilesChange={handleFiles}
 * />
 * ```
 */
export declare enum AcceptedFileTypes {
    TXT = "TXT",
    DOCX = "DOCX",
    PDF = "PDF",
    JPEG = "JPEG",
    PNG = "PNG",
    XLSX = "XLSX",
    SVG = "SVG",
    JSON = "JSON",
    CSV = "CSV",
    "TIF/TIFF" = "TIF/TIFF",
    ZIP = "ZIP"
}
/**
 * Type representing one of the accepted file type values from AcceptedFileTypes enum.
 */
export type AcceptedFileType = (typeof AcceptedFileTypes)[keyof typeof AcceptedFileTypes];
/**
 * Props for the FileUpload component.
 */
export interface FileUploadProps {
    /** Callback triggered when valid files are selected. Required. */
    onFilesChange: (files: File[]) => void;
    /** Callback triggered when file validation fails (invalid type or size). */
    onError?: (error: Error) => void;
    /** If true, shows only a compact button instead of the full drag-and-drop area. Defaults to false. */
    hideDragAndDrop?: boolean;
    /** Array of accepted file types. Defaults to PDF, JPEG, PNG, TIF/TIFF, DOCX, CSV. */
    inputTypes?: AcceptedFileType[];
    /** If true, disables the file input. Defaults to false. */
    disabled?: boolean;
}
/**
 * FileUpload Component
 *
 * A versatile file input component that supports both drag-and-drop and click-to-browse
 * interactions. Provides built-in file type validation, size restrictions (max 50MB),
 * and visual feedback during drag operations. Can be rendered in two modes: a full
 * drag-and-drop area or a compact button-only mode.
 *
 * @example
 * ```tsx
 * <FileUpload
 *   onFilesChange={(files) => console.log(files)}
 *   onError={(error) => console.error(error)}
 *   inputTypes={[AcceptedFileTypes.PDF, AcceptedFileTypes.DOCX]}
 * />
 * ```
 *
 * @see [Lasso FileUpload README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/file-upload/README.md)
 */
export declare function FileUpload(props: FileUploadProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=file-upload.d.ts.map