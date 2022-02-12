const Media = ({data, handleChange, disabled, type, partId = ''}) => {
  const setUrlFile = (file) => {
    const issetFile = file && typeof file === 'string';
    if (issetFile && (file.includes("/image") || file.includes("/audio"))) {
      return `/storage/${file}`;
    }
    
    return file;
  }

  const loadFile = async (event) => {
    const { name, files } = event.target;
    const [file] = files;
    const value = URL.createObjectURL(file);
    if (type === 'group') handleChange({ ...data, [name]: value});
    if (type === 'question') handleChange(value, name);
  }

  return (
    <div className="row">
      {
        <div className="col-md-6 col-xs-12">
          <div><label>Hình ảnh</label></div>
          {!disabled &&
            <div>
              <input
                type="file"
                accept="image/jpg, image/jpeg, image/png"
                name="image"
                id={`image_${type}_${partId}_${data.id}`}
                onChange={(event) => loadFile(event)}
              />
            </div>
          }
          <img className="mt-2" id="imagePreview" src={setUrlFile(data.image)} />
        </div>
      }
      <div className="col-md-6 col-xs-12">
        <div><label>Âm thanh</label></div>
        {!disabled &&
          <div>
            <input
              type="file"
              accept="audio/*"
              name="audio"
              id={`audio_${type}_${partId}_${data.id}`}
              onChange={(event) => loadFile(event)}
            />
          </div>
        }
        <audio className="mt-2" id="audioPreview" controls>
          <source src={setUrlFile(data.audio)} />
        </audio>
      </div>
    </div>
  )
}

export default Media;
