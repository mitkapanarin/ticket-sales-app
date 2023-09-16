import { useGetAllBookMarksQuery } from "../store/API/BookMarkAPI";
import ItemCard from "../components/Card/ItemCard";
import { gradientTextStyles } from "../components/Text/TextStyles";

const BookMark = () => {
  const { data, isLoading, isError, isFetching } =
    useGetAllBookMarksQuery(null);
  console.log("Data from API:", data);

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.error("Error loading data:", data);
    return <div>Error: Unable to load data</div>;
  }
  return (
    <div className="flex flex-wrap justify-center">
      <h2
        className={`${gradientTextStyles} text-center mb-10 mt-10 text-4xl font-bold capitalize w-full`}
      >
        Bookmarked Events
      </h2>
      <div className="flex space-x-20">
        {data?.data?.map(
          (event: {
            _id: string;
            date: Date;
            image: string;
            location: string;
            title: string;
          }) => (
            <ItemCard
              key={event._id}
              date={event.date}
              image={event.image}
              location={event.location}
              title={event.title}
            />
          )
        )}
      </div>
    </div>
  );
};

export default BookMark;
