import { useOutletContext, useSearchParams } from 'react-router-dom';
import { IOutletContext } from '../App';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getVideosByKeyword } from '../api';

export default function Search() {
  const { handleOutletRendered } = useOutletContext<IOutletContext>();
  const [searchParams] = useSearchParams();
  const searchKey = searchParams.get('searchKey');
  const { data: videos, isLoading } = useQuery({
    queryKey: ['search', searchKey],
    queryFn: () => getVideosByKeyword(searchKey || ''),
    enabled: !!searchKey,
  });
  return <div>search</div>;
}
