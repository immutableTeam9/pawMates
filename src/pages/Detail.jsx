import DetailPost from '../components/detail/DetailPost';
import DetailComments from '../components/detail/DetailComments';
import { useNavigate } from 'react-router-dom';

function Detail() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate('/')}>HOME으로 이동</button>
      <DetailPost />
      <DetailComments />
    </div>
  );
}
export default Detail;
