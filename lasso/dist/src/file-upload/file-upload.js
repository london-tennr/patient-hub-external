import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Icon } from "@iconify/react";
import { useMemo, useRef, useState } from "react";
import { Button } from "../button/button";
import { Stack } from "../stack/stack";
import { Text } from "../text/text";
import { cn } from "../utils/cn";
/** Maximum file size allowed for upload (50MB) */
const MAX_FILE_SIZE = 52428800; // 50MB
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
export var AcceptedFileTypes;
(function (AcceptedFileTypes) {
    AcceptedFileTypes["TXT"] = "TXT";
    AcceptedFileTypes["DOCX"] = "DOCX";
    AcceptedFileTypes["PDF"] = "PDF";
    AcceptedFileTypes["JPEG"] = "JPEG";
    AcceptedFileTypes["PNG"] = "PNG";
    AcceptedFileTypes["XLSX"] = "XLSX";
    AcceptedFileTypes["SVG"] = "SVG";
    AcceptedFileTypes["JSON"] = "JSON";
    AcceptedFileTypes["CSV"] = "CSV";
    AcceptedFileTypes["TIF/TIFF"] = "TIF/TIFF";
    AcceptedFileTypes["ZIP"] = "ZIP";
})(AcceptedFileTypes || (AcceptedFileTypes = {}));
/** Maps accepted file type display names to their MIME types */
const txtDisplayToTypeMap = {
    PDF: "application/pdf",
    DOCX: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    TXT: "text/plain",
    JPEG: "image/jpeg",
    PNG: "image/png",
    XLSX: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    SVG: "image/svg+xml",
    JSON: "application/json",
    CSV: "text/csv",
    "TIF/TIFF": "image/tiff",
    ZIP: "application/zip",
};
/** Maps accepted file type display names to their file extensions for the input accept attribute */
const fileExtensionMap = {
    PDF: ".pdf",
    DOCX: ".doc,.docx",
    TXT: ".txt",
    JPEG: ".jpg,.jpeg",
    PNG: ".png",
    XLSX: ".xlsx",
    SVG: ".svg",
    JSON: ".json",
    CSV: ".csv",
    "TIF/TIFF": ".tiff",
    ZIP: ".zip",
};
/** Default accepted file types when inputTypes prop is not provided */
const defaultInputTypes = [
    AcceptedFileTypes.PDF,
    AcceptedFileTypes.JPEG,
    AcceptedFileTypes.PNG,
    AcceptedFileTypes["TIF/TIFF"],
    AcceptedFileTypes.DOCX,
    AcceptedFileTypes.CSV,
];
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
export function FileUpload(props) {
    const [dragging, setDragging] = useState(false);
    const fileInputRef = useRef(null);
    const inputTypes = props.inputTypes ?? defaultInputTypes;
    const { validFileTypes, acceptAttribute, isNonDefault } = useMemo(() => {
        const validTypes = inputTypes.map((type) => txtDisplayToTypeMap[type]);
        const acceptExtensions = inputTypes
            .map((type) => fileExtensionMap[type])
            .join(",");
        const isNonDefault = JSON.stringify([...inputTypes].sort()) !==
            JSON.stringify([...defaultInputTypes].sort());
        return {
            validFileTypes: validTypes,
            acceptAttribute: acceptExtensions,
            isNonDefault,
        };
    }, [inputTypes]);
    const handleDragOver = (e) => {
        if (props.disabled)
            return;
        e.preventDefault();
        e.stopPropagation();
        setDragging(true);
    };
    const handleDragLeave = (e) => {
        if (props.disabled)
            return;
        e.preventDefault();
        e.stopPropagation();
        if (e.currentTarget.contains(e.relatedTarget))
            return;
        setDragging(false);
    };
    const handleDrop = (e) => {
        if (props.disabled)
            return;
        e.preventDefault();
        setDragging(false);
        const files = Array.from(e.dataTransfer.files);
        handleChange(files);
    };
    const handleChange = (files) => {
        if (props.disabled)
            return;
        // Filter for common document types and reasonable size (50MB)
        const validFiles = files.filter((file) => {
            const isValidType = validFileTypes.some((type) => file.type.startsWith(type));
            const isValidSize = file.size <= MAX_FILE_SIZE;
            if (!isValidType || !isValidSize) {
                props.onError?.(new Error("Invalid file type or size"));
            }
            return isValidType && isValidSize;
        });
        props.onFilesChange(validFiles);
    };
    if (props.hideDragAndDrop) {
        return (_jsxs(Stack, { direction: "row", className: "w-full relative", align: "center", children: [_jsx("input", { type: "file", ref: fileInputRef, className: "absolute inset-0 opacity-0 cursor-pointer !block", accept: acceptAttribute, multiple: true, onChange: (e) => handleChange(Array.from(e.target.files ?? [])) }), _jsxs(Button, { variant: "outline", className: "bg-white text-[13px] hover:bg-white", children: [_jsx(Icon, { icon: "ph:upload-simple", className: "w-5 h-5" }), "Choose Files"] }), _jsx(Text, { className: "text-neutral-500 text-xs", children: isNonDefault
                        ? `${inputTypes.join(", ")} format, up to 50 MB`
                        : "50 Mb max" })] }));
    }
    return (_jsxs("div", { className: cn("relative w-full flex items-center justify-center border-2 border-dashed rounded-sm transition-colors py-2 cursor-pointer h-full", dragging ? "border-primary-600 bg-muted/50" : "bg-background border"), onDragOver: handleDragOver, onDragLeave: handleDragLeave, onDrop: handleDrop, children: [_jsx("input", { type: "file", ref: fileInputRef, className: "absolute inset-0 opacity-0 cursor-pointer !block", accept: acceptAttribute, multiple: true, disabled: props.disabled, onChange: (e) => handleChange(Array.from(e.target.files ?? [])) }), _jsxs(Stack, { direction: "col", spacing: "sm", className: "items-center text-center py-5", children: [_jsx(Icon, { icon: "ph:file-arrow-up", className: "w-8 h-8 text-muted-foreground mb-1" }), _jsx(Text, { size: "sm", children: "Drag and Drop your files here" }), _jsx(Text, { className: "text-muted-foreground text-xs", children: "Or click to browse" }), _jsxs(Button, { variant: "outline", className: "bg-white text-[13px] hover:bg-white", children: [_jsx(Icon, { icon: "ph:upload-simple", className: "w-5 h-5" }), "Choose Files"] }), _jsx(Text, { className: "text-muted-foreground text-xs", children: isNonDefault
                            ? `${inputTypes.join(", ")} format, up to 50 MB`
                            : "50 Mb max" })] })] }));
}
