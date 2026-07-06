 const getVideoId = (url) => {

  const regExp =
    /^.*(youtube\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;

  const match = url.match(regExp);

  return match && match[2].length === 11
    ? match[2]
    : null;
};

export  {getVideoId};