import { Upload, Icon, Modal } from 'antd';
import React from 'react';

const { Dragger } = Upload;

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

const props = {
    name: 'file',
    multiple: true,
    listType: 'picture-card',
    action:
        'https://api.cloudinary.com/v1_1/pop4enz/upload?upload_preset=crowdfundingpop',
    accept: 'image/*',
};

class ImageUploader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: [],
        };
    }

    handleChange = info => {
        console.log("info",info);
        const rest = [...info.fileList];
        const { status } = info.file;
        if (status !== 'uploading') {
            this.props.setFieldValue('images', ...rest);
        }
    };

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    handleCancel = () => this.setState({ previewVisible: false });

    render() {
        const { previewVisible, previewImage, fileList } = this.state;

        return (
            <div>
                <Dragger
                    {...props}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    defaultFileList={this.props.values.images}
                >
                    <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">
                        Click or drag image to this area to upload
                    </p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload.
                    </p>
                </Dragger>
                <Modal
                    visible={previewVisible}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img
                        alt="uploaded image"
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                        src={previewImage}
                    />
                </Modal>
            </div>
        );
    }
}

export default ImageUploader;
