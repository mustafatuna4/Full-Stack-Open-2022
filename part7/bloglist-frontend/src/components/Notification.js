import { useDispatch, useSelector } from 'react-redux';

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  if (!notification) return;
  const type = notification.type;
  const message = notification.message;

  if (message === '') {
    return '';
  }
  if (type === 'update') {
    return <div className="update">{message}</div>;
  } else {
    return <div className="error">{message}</div>;
  }
};
export default Notification;
