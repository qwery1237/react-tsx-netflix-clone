import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { FiSearch } from 'react-icons/fi';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
interface IProps {
  closeSearchBar: () => void;
}
const Wrapper = styled(motion.div)`
  background-color: rgba(20, 20, 20, 1);
  border: solid 1px white;
  display: flex;
  width: 250px;
  max-width: 92vw;
  height: 30px;
  align-items: center;
  padding: 0 4px;
  gap: 12px;
  transform-origin: right center;
`;
const Input = styled.input``;
const Btn = styled(motion.button)`
  display: flex;
  align-items: center;
`;
export default function SearchBar({ closeSearchBar }: IProps) {
  const { register, watch } = useForm();
  const [_, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const searchKey = watch('search');
  const previousLocation = useRef(pathname === '/' ? pathname + '/' : pathname);

  useEffect(() => {
    if (!searchKey) {
      navigate(previousLocation.current);
      return;
    }
    if (!pathname.includes('/search')) {
      previousLocation.current = pathname === '/' ? pathname + '/' : pathname;

      navigate('/search');
    }
    setSearchParams({ searchKey });
  }, [searchKey]);
  return (
    <Wrapper initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}>
      <Btn layoutId='search'>
        <FiSearch />
      </Btn>
      <Input
        {...register('search')}
        autoFocus
        onBlur={closeSearchBar}
        placeholder='Titles,people,genres'
      />
    </Wrapper>
  );
}
