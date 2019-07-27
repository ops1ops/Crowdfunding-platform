import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

class ImageUpload extends Component {
    onDrop = () => {
        console.log(this);
    };

    render() {
        const maxSize = 5242880;

        return (
            <div className="text-center mt-5">
                <Dropzone
                    onDrop={this.onDrop}
                    accept="image/*"
                    minSize={0}
                    maxSize={5242880}
                    multiple
                >
                    {({getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles, acceptedFiles}) => {
                        const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;
                        return (
                            <div {...getRootProps()} className="border">
                                <input {...getInputProps()} />
                                {!isDragActive && 'Click here or drop a file to upload!'}
                                {isDragActive && !isDragReject && "Drop it like it's hot!"}
                                {isDragReject && "File type not accepted, sorry!"}
                                {isFileTooLarge && (
                                    <div className="text-danger mt-2">
                                        File is too large.
                                    </div>
                                )}
                                <ul className="list-group mt-2">
                                    {acceptedFiles.length > 0 && acceptedFiles.map(acceptedFile => (
                                        <li className="list-group-item list-group-item-success">
                                            {acceptedFile.name}
                                            {console.log(acceptedFile)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    }
                </Dropzone>
            </div>
        );
    }
}

export default ImageUpload;
