import { Flex } from '@/components/common/flex';
import Nav from '@/components/common/layout/nav';
import styled from 'styled-components';

function Header() {
  return (
    <Wrapper>
      <LeftBox>
        <Logo>MEMAMON</Logo>
        <SearchWrapper>
          <input type="text" />
        </SearchWrapper>
      </LeftBox>
      <Nav />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 70px;
  background-color: #fff;
  padding: 15px 30px;

  display: flex;
  justify-content: space-between;
`;

const LeftBox = styled(Flex)`
  gap: 50px;
  height: 40px;
`;

const SearchWrapper = styled.div`
  input {
    box-sizing: border-box;
    width: 250px;
    height: 39px;
    padding: 10px 20px;
    border-radius: 20px;
    border: 1px solid #707070;
  }
`;

const Logo = styled.div`
  color: var(--basic-color);
  font-size: 1.875rem;
  font-weight: bold;
  line-height: 40px;
`;

export default Header;
