import bowser from 'bowser';
export default function setDevice() {
//   const { ClientType } = qs.parse(location.search)
  const  ClientType  = 'desktop'

  switch (ClientType) {
    case 'mobile':
      {
        bowser.mobile = true;
        bowser.isHandheld = true;
        break;
      }

    case 'desktop':
      {
        bowser.mobile = false;
        bowser.tablet = false;
        bowser.isHandheld = false;
        break;
      }

    default:
      break;
  }
}