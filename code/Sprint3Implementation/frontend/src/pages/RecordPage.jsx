import React from 'react'
import { ArrowLeftIcon, EditIcon, Trash2Icon, CalendarIcon, UserIcon } from 'lucide-react'
import LoadingSpinner from '../components/LoadingSpinner'
import { useAuth } from '@clerk/react'
import { useRecord, useDeleteRecord } from '../../hooks/useRecords'
import { useParams, Link, useNavigate } from 'react-router'
import { deleteRecord } from '../../lib/api'

function RecordPage() {
  const { id } = useParams();
  const { userId } = useAuth();
  const navigate = useNavigate();

  const { data: record, isLoading, error } = useRecord(id);
  const deleteMutation = useDeleteRecord(id);

  const handleDelete = (id) => {
    if (confirm("Deletes this record permanently?")){
        deleteMutation.mutate(id, {
        onSuccess: () => navigate("/")
      });
    }
  };

  if (isLoading) return <LoadingSpinner />

  if (error || !record) {
    return (
      <div className='card bg-base-300 max-w-md mx-auto'>
        <div className='card-body items-center text-center'>
          <h2 className='card-title text-error'>Records not found</h2>
          <Link to="/" className='btn btn-primary btn-sm'>
          Go Home
          </Link>
        </div>
      </div>
    );
  }

  const isOwner = userId === record.userId;


  return (
  <div className='max-w-4xl mx-auto space-y-6'>
    <div className='flex items-center justify-between'>
      <Link to="/" className='btn btn-ghost btn-sm gap-1'>
        <ArrowLeftIcon className='size-4' /> Back
      </Link>
      {isOwner && (
        <div className='flex gap-2'>
          <Link to={`/edit/${record.id}`} className='btn btn-ghost btn-sm gap-1'>
            <EditIcon className='size-4' /> Edit
          </Link>
          <button
            onClick={() => handleDelete(record.id)}
            className='btn btn-error btn-sm gap-1'
            disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? (
                <span className='loading loading-spinner loading-xs' />
              ) : (
                <Trash2Icon className='size-4'/>
              )}
              Delete
            </button>
        </div>
      )}
    </div>

    <div className='grid lg:grid-cols-2 gap-6'>
      {/* IMAGE */}
      <div className='card bg-base-300'>
        <figure className='p-4'>
          <img
            src={record.imageUrl}
            alt={record.title}
            className='rounded-xl w-full h-80 object-cover'
          />
        </figure>
      </div>

      <div className='card bg-base-300'>
        <div className='card-body'>
          <h1 className='card-title text-2xl'>{record.title}</h1>

          <div className='flex flex-wrap gap-4 text-sm text-base-content/60 my-2'>
            <div className='flex items-center gap-1'>
              <CalendarIcon className='size-4' />
              {new Date(record.createdAt).toLocaleDateString()}
            </div>
            <div className='flex flex-wrap'>
              <UserIcon className='size-4' />
              {record.user?.name}
            </div>
          </div>

          <div className='divider my-2'></div>

          <p className='text-base-content/80 leading-relaxed'>{record.description}</p>

          {record.user && (
            <>
              <div className='divider my-2'></div>
              <div className='flex items-center gap-3'>
                <div className='avatar'>
                  <div className='w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
                    <img
                      src={record.user.imageUrl}
                      alt={record.user.name}
                    />
                  </div>
                </div>
                <div>
                  <p className='font-semibold'>{record.user.name}</p>
                  <p className='text-xs text-base-content/50'>Creator</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>

    {/* Relevant Details */}
    <div className='card bg-base-300'>
      <div className='card-body'>
        <h1 className='card-title text-2xl font-bold'>Overview</h1>
        <div className='divider my-2'></div>
          <p className='text-base-content/80 leading-relaxed'>Time Period: {record.date}</p>
          <p className='text-base-content/80 leading-relaxed'>Material: {record.material}</p>
          <p className='text-base-content/80 leading-relaxed'>Dimensions: {record.dimensions}</p>
          <p className='text-base-content/80 leading-relaxed'>Classification: {record.classification}</p>
          <p className='text-base-content/80 leading-relaxed'>Credit: {record.credit}</p>
          <p className='text-base-content/80 leading-relaxed'>Collection: {record.collection}</p>
      </div>
    </div>
  </div>
  );
}

export default RecordPage