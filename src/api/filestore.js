import config from 'config';

function unpack(res) {
  return res.data.data;
}

function presignUploadUrl(uploadType, contentType, key, privateFile) {
  let priv = '';
  if (privateFile && privateFile === true) {
    priv = '?private=true';
  }

  return `${config.SERVER_HOST}/upload/${uploadType}/${encodeURIComponent(
    contentType,
  )}/${encodeURIComponent(key)}${priv}`;
}

export default function initializeFilestore({ axios, getTokenSilently }) {
  return {
    async uploadFile(file, uploadType, privateFile, dispatch) {
      const token = await getTokenSilently();

      let { type } = file;
      if (!type) {
        type = file.name.includes(`.mobi`)
          ? `application/x-mobipocket-ebook`
          : null;
      }
      const urls = await axios
        .get(presignUploadUrl(uploadType, type, file.name, privateFile), {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': file.type,
          },
        })
        .then(unpack);

      await axios.put(urls.url, file, {
        headers: {
          'Content-Type': file.type,
        },
        onUploadProgress: progress => {
          const { loaded, total } = progress;
          const percentageProgress = Math.floor((loaded / total) * 100);
          if (dispatch) {
            dispatch({
              type: 'UPLOAD_PERCENTAGE',
              payload: { percentage: percentageProgress },
            });
          }
        },
      });

      return urls.saveUrl;
    },
  };
}
