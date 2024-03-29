import useFetch from "./useFetch";

const Home = () => {
  const { error, isPending, data: chuyen_xe } = useFetch('http://localhost:8000/blogs')

  return (
    <div className="home">
      { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }
      {/* { chuyen_xe && <BlogList chuyen_xe={chuyen_xe} /> } */}
    </div>
  );
}
 
export default Home;