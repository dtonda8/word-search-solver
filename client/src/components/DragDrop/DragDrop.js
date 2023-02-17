import React from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG"];

const DragDrop = ({ handleFile }) => 
    <FileUploader handleChange={(file) => handleFile(file)} name="file" types={fileTypes} />

export default DragDrop;