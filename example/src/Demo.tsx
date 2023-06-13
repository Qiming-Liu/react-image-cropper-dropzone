import React, {useState} from 'react'
import ReactImageCropperDropzone from '../../src'
import UploadSvg from './UploadSvg'

import './Demo.css'

const Demo: React.FC = () => {
  const [base64, setBase64] = useState<string>('')

  const afterCrop = (base64: string) => {
    setBase64(base64)
    console.log(base64)
  }

  const imageStyle: React.CSSProperties = {
    backgroundImage: `url(${base64})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    borderRadius: 1,
    height: 380,
  }

  return (
    <div className="Paper">
      <h6 className="h6">Post cover</h6>
      {base64 ? (
        <div className="Box Border" style={imageStyle}></div>
      ) : (
        <div className="Box Border">
          <h6 className="h6">Select a cover image</h6>
          <h6 className="subtitle">Image used for the post cover</h6>
        </div>
      )}
      <ReactImageCropperDropzone
        accept={{
          'image/jpeg': ['.jpeg', '.jpg'],
          'image/png': ['.png'],
        }}
        title="Crop your picture"
        lockAspectRatio={true}
        aspectRatio={952 / 380}
        afterCrop={afterCrop}
      >
        <div className="Box Border Button" role="button" tabIndex={0}>
          <div className="Box">
            <UploadSvg />
            <h6 className="h6">Select image</h6>
            <h6 className="subtitle">Drop image browse through your machine</h6>
          </div>
        </div>
      </ReactImageCropperDropzone>
    </div>
  )
}

export default Demo
