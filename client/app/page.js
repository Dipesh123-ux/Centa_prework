import Image from 'next/image'
import Link from 'next/link'

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Link href="/user/signin" className="bg-blue-500 text-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 w-40 md:w-48">
        User
      </Link>
      <Link href="/admin/signin" className="bg-red-500 text-center hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-40 md:w-48">
        Admin
      </Link>
    </div>
  );
};

export default Home;
