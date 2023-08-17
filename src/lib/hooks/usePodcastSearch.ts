import { PodcastListItem } from '@models/podcast.model';
import { securizeString } from '@utils/string';
import { useState, useEffect, useMemo } from 'react';

const usePodcastSearch = () => {
  const [originalList, setOriginalList] = useState<PodcastListItem[]>([]);
  const [list, setList] = useState<PodcastListItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    setList(
      originalList.filter((item: PodcastListItem) =>
        searchTerm
          ? securizeString(item.artist).includes(securizeString(searchTerm)) ||
            securizeString(item.name).includes(securizeString(searchTerm))
          : item,
      ),
    );
  }, [searchTerm]);

  useEffect(() => {
    setList(originalList);
    setSearchTerm('');
  }, [originalList]);

  const data = useMemo(
    () => ({
      list,
      searchTerm,
      setSearchTerm,
      setOriginalList,
    }),
    [list, searchTerm, originalList],
  );

  return data;
};

export default usePodcastSearch;
