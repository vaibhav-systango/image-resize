export default function checkResponseStatus(responseState) {
  let reponseMessage = 'Something went wrong!';
  if (responseState && responseState.response && responseState.response.status) {
    switch (responseState.response.status) {
      case 400:
        reponseMessage = 'Bad Request';
        break;
      case 401:
        reponseMessage = 'Unauthorized';
        break;
      case 403:
        reponseMessage = 'Forbidden';
        break;
      case 404:
        reponseMessage = 'Not found';
        break;
      case 500:
        reponseMessage = 'Internal server error';
        break;
      case 503:
        reponseMessage = 'Unavailable';
        break;
      default:

        break;
    }
  } else {
    const connection = navigator.onLine;
    reponseMessage = !connection ? 'check connection and retry' : 'Something went wrong!';
  }

  return reponseMessage;
}
