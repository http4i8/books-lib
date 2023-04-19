export const entriesHandler = (searchParams: URLSearchParams) => {
  let entries = {};

  Array.from(searchParams.entries()).forEach((entrie) => {
    entries = {
      ...entries,
      [entrie[0]]: entrie[1],
    };
  });

  return entries;
};
