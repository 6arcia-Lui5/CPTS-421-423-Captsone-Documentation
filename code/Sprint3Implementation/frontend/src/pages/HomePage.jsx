import { useRecords } from '../../hooks/useRecords'
import { PackageIcon, SparklesIcon } from 'lucide-react';
import { Link } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import RecordCard from '../components/RecordCard';

function HomePage() {
  const {data: records, isLoading, error } = useRecords();
  if(isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <div role="alert" className="alert alert-error">
        <span>Something went wrong. Please refresh the page.</span>
      </div>
    );
  }

  return (
    <div className='space-y-10'>
      {/* HERO */}
      <div className='hero bg-linear-to-br from-base-300 via-base-200 to-base-300 rounded-box overflow-hidden'>
        <div className='hero-content flex-col lg:flex-row-reverse gap-10 py-10 px-10'>
          <div className='relative'>
            <div className=''/>
            <img
              src="./temporaryRomanCoin.png"
              alt="Contributor Stock Image"
              className='relative h-64 w-125 lg:h-72 rounded-2xl shadow-2xl' 
            />
          </div>
          <div className='text-center lg:text-left'>
            <h1 className='text-4xl lg:text-5xl font-bold leading-tight'>
              Contribute to the collection. Share your <span className='text-primary'>Artifacts</span>
            </h1>
            <p className='py-4 text-base-content/60'>
              Upload, Discover, and Connect with other contributors
            </p>
            <Link to="/create" className='btn btn-primary'>
            <SparklesIcon className='size-4' />
              Start Here
            </Link>
          </div>
        </div>
      </div>

      {/* HERO */}
      <div className='hero bg-linear-to-br from-base-300 via-base-200 to-base-300 rounded-box overflow-hidden'>
        <div className='hero-content flex-col lg:flex-row-reverse gap-10 py-10 px-10'>
          <div className='relative'>
            
          </div>
          <div className='text-center lg:text-left'>
            <h1 className='text-4xl lg:text-5xl font-bold leading-tight'>
              Our Mission.
            </h1>
            <p className='py-4 text-base-content/60'>
              Our organization is dedicated to the discovery, preservation, and study of historical artifacts bearing inscription errors. These overlooked imperfections—ranging from misspellings and misaligned text to engraving anomalies—offer unique insights into the human, cultural, and technological contexts in which these objects were created. By collecting and documenting such artifacts, we aim to highlight the role of craftsmanship, error, and variation in shaping material history.

We strive to create an accessible digital archive that supports research, education, and public engagement. Through collaboration with collectors, historians, and institutions, our platform fosters a deeper appreciation for the stories embedded not only in perfected works, but in the flaws that reveal the realities of their production.
            </p>
          </div>
        </div>
      </div>

      {/* RECORDS */}
      <div>
        <h2 className='text-xl font-bold flex items-center gap-2 mb-4'>
          <PackageIcon className='size-5 text-primary' />
          All Artifacts
        </h2>

        {records.length === 0 ? (
          <div className='card bg-base-300'>
            <div className='card-body items-center text-center py-16'>
              <PackageIcon className='size-16 text-base-content/20' />
              <h3 className='card-title text-base-content/50'>No artifact records available</h3>
              <p className='text-base-content/40 text-sm'>Be the first to contribute!</p>
              <Link to="/create" className='btn btn-primary btn-sm mt-2'>
                Create A New Artifact Record
              </Link>
            </div>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {records.map((record) => (
              <RecordCard key={record.id} record={record} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage