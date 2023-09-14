import { useGetAllBookMarksQuery } from "../store/API/BookMarkAPI";

const BookMark = () => {
  const { data, isLoading, isError, isFetching } =
    useGetAllBookMarksQuery(null);

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }
  console.log(data);

  return <div>BookMark</div>;
};

export default BookMark;
