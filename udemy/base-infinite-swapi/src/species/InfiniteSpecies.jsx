import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";
import { useInfiniteQuery } from "react-query";

const initialUrl = "https://swapi.dev/api/species/"
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    isFetchingNextPage,
  } = useInfiniteQuery("species", ({ pageParam =  initialUrl }) => fetchUrl(pageParam), {
    getNextPageParam: (lastPage) => lastPage.next || undefined,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.pages.map((pageData) => {
          return pageData.results.map((item) => {
            return (
              <Species
                key={item.name}
                name={item.name}
                language={item.language}
                averageLifespan={item.average_lifespan}
              />
            );
          });
        })}
      </InfiniteScroll>
      {isFetchingNextPage && <div>Loading More...</div>}
    </>
  );
}
