export const fetchCompanyProfile = async (fields, signal) => {
  const { companyName, country } = fields;

  const [countryRes, wikiRes, newsRes] = await Promise.all([
    fetch(`https://restcountries.com/v3.1/name/${country}`, { signal }),
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${companyName}`, {
      signal,
    }),
    fetch(
      `https://gnews.io/api/v4/search?q=${companyName}&lang=en&max=6&apikey=${import.meta.env.VITE_GNEWS_KEY}`,
      { signal },
    ),
  ]);

  if (!countryRes.ok) throw new Error(`HTTP ERROR: country fetch failed`);
  if (!wikiRes.ok) throw new Error(`HTTP ERROR: wiki fetch failed`);
  if (!newsRes.ok) throw new Error(`HTTP ERROR: news fetch failed`);

  const [countryData, wikiData, newsData] = await Promise.all([
    countryRes.json(),
    wikiRes.json(),
    newsRes.json(),
  ]);

  return { countryData, wikiData, newsData };
};
