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

const StDetailWrapper = styled.div`
  box-sizing: border-box;
  width: 1200px;
  max-width: 1200px;
  min-width: 360px;
  /* margin: 0 auto; */

  display: flex;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const DetailLayout = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px 40px;
`;
