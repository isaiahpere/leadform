import { useNavigate } from "react-router-dom";
import { useProfileState } from "../context/profileContext";

const Results = () => {
  const navigate = useNavigate();
  const { data, isLoading, errors } = useProfileState();

  if (isLoading) return <p>Loading...</p>;

  if (errors)
    return (
      <div>
        <p className="text-red-500">Somethign went wrong. Please try again</p>
        <button
          onClick={() => navigate("/")}
          className="bg-black text-white px-3 py-2 rounded-md mt-4 cursor-pointer"
        >
          Go back
        </button>
      </div>
    );

  if (!data) {
    return (
      <div>
        <p>No data yet!</p>
        <button
          onClick={() => navigate("/")}
          className="bg-black text-white px-3 py-2 rounded-md mt-4 cursor-pointer"
        >
          Go Back
        </button>
      </div>
    );
  }

  const { countryData, wikiData, newsData } = data;

  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-4xl font-bold">This is results page</h1>

      {countryData && (
        <div>
          <p>
            Capital:{" "}
            <span className="font-bold">{countryData?.[0]?.capital?.[0]}</span>
          </p>
          <p>
            Region:{" "}
            <span className="text-zinc-600 font-semibold">
              {countryData?.[0]?.region}
            </span>
          </p>
        </div>
      )}
      {wikiData && (
        <div>
          <p className="font-bold">{wikiData?.title}</p>
          <p className="text-zinc-600 font-semibold">{wikiData?.description}</p>
          <a
            to={wikiData?.content_urls?.desktop?.page}
            target="_blank"
            className="text-blue-900 underline underline-offset-2"
            rel="noopener noreferrer"
          >
            Go to Wiki
          </a>
        </div>
      )}
      {newsData &&
        newsData?.articles.length > 0 &&
        newsData.articles.map((item) => (
          <div key={item.id}>
            <p className="text-lg font-semibold">{item?.title}</p>
            <p className="text-zinc-600 text-sm mb-3">{item?.description}</p>
            <a
              className=" text-blue-900 underline underline-offset-2"
              to={item?.source?.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item?.source?.name}
            </a>
          </div>
        ))}
    </div>
  );
};

export default Results;
