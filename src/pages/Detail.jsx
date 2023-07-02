import DetailPost from '../components/detail/DetailPost';
import DetailComments from '../components/detail/DetailComments';
import { styled } from 'styled-components';

function Detail() {
  return (
    <DetailLayout>
      <StDetailWrapper>
        <DetailPost />
        <DetailComments />
      </StDetailWrapper>
    </DetailLayout>
  );
}
export default Detail;

const DetailLayout = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 40px;
`;

const StDetailWrapper = styled.div`
  box-sizing: border-box;
  max-width: 1200px;
  min-width: 992px;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  border-radius: 8px;
  border: 1px solid #d2d2d2;
  background-color: #fff;
`;
