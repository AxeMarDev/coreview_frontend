import React, { useState } from 'react';
import API, {tFile} from "../API/api.ts";
import { useLocation } from "react-router-dom";

const ImageUploader: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id') || "undef";

    const [ imageFields , setImageFields ]= useState<tFile>({file_name:"", mime_type:""})

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile && selectedFile.type === "image/png") {
            setFile(selectedFile);
        } else {
            alert('Please select a PNG file.');
            setFile(null);
        }
    };

    const handleUpload = async () => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setUploading(true);
                API.addFile( imageFields,base64String, id)
                    .then(resp => {
                        console.log('Upload successful:', resp);
                        alert('Upload successful!');
                    })
                    .catch(error => {
                        console.error('Upload failed:', error);
                        alert('Upload failed!');
                    })
                    .finally(() => {
                        setUploading(false);
                    });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <input type={"text"} value={imageFields.file_name} onChange={(e)=>setImageFields({...imageFields, file_name: e.target.value})}/>
            <input type={"text"} value={imageFields.mime_type} onChange={(e)=>setImageFields({...imageFields, mime_type: e.target.value})}/>

            <input type="file" accept="image/png" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={!file || uploading}>
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
        </div>
    );
};

export default ImageUploader;
