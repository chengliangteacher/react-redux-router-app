import { Upload } from "antd"
import React from "react"

export default function GUpload() {
    const uploadButton = (
        <div>
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    let handleOnchange = (info: any) => {
        console.log(info)
    }
    return (
        <Upload name="file" headers={{ Authorization: sessionStorage.token }} listType="picture-card" showUploadList action="/api/upload" onChange={handleOnchange}>
            {uploadButton}
        </Upload>
    )
}