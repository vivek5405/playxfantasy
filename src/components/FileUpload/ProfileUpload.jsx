export default class UploadImages extends Component {
    render() {
      const {
        currentFile,
        previewImage,
        progress,
        message,
        imageInfos,
      } = this.state;
  
      return (
        <div>
          <div className="row">
            <div className="col-8">
              <label className="btn btn-default p-0">
                <input type="file" accept="image/*" onChange={this.selectFile} />
              </label>
            </div>
  
            <div className="col-4">
              <button
                className="btn btn-success btn-sm"
                disabled={!currentFile}
                onClick={this.upload}
              >
                Upload
              </button>
            </div>
          </div>
  
          {currentFile && (
            <div className="progress my-3">
              <div
                className="progress-bar progress-bar-info progress-bar-striped"
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: progress + "%" }}
              >
                {progress}%
              </div>
            </div>
          )}
  
          {previewImage && (
            <div>
              <img className="preview" src={previewImage} alt="" />
            </div>
          )}
  
          {message && (
            <div className="alert alert-secondary mt-3" role="alert">
              {message}
            </div> 
          )}
  
          <div className="card mt-3">
            <div className="card-header">List of Files</div>
            <ul className="list-group list-group-flush">
              {imageInfos &&
                imageInfos.map((img, index) => (
                  <li className="list-group-item" key={index}>
                    <a href={img.url}>{img.name}</a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      );
    }
  }