import { useNavigate } from 'react-router-dom';

export const ProfilePage = (props) => {
  const { cookies } = props;
  const navigate = useNavigate();
  if (!cookies.user) {
    navigate('/login');
  }
  return <div>ProfilePage</div>;
};
