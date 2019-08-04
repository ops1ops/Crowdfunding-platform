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
        'https://api.cloudinary.com/v1_1/ops1ops/upload?upload_preset=k6kk7wug',
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

    componentDidMount() {
        if (this.props.values.images)
        this.props.setFieldValue('images', this.props.values.images);
    }

    handleChange = info => {
        console.log("info", info);
        const { status } = info.file;
        if (status !== 'uploading') {
            const imagesUrl = info.fileList.map(item => (item.response ? item.response.url : item.url));
            this.props.setFieldValue('images', imagesUrl);
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
        const { previewVisible, previewImage } = this.state;
        const { images } = this.props.values;

        return (
            <div>
                <Dragger
                    {...props}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    defaultFileList={images}
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
