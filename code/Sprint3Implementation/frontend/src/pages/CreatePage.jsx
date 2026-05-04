import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router'
import { useCreateRecord } from '../../hooks/useRecords';
import { ArrowLeftIcon, FileTextIcon, SparklesIcon, TypeIcon } from 'lucide-react';
import { useUser } from '@clerk/react';

function CreatePage() {
  const { user } = useUser();
  const navigate = useNavigate();
  const createRecord = useCreateRecord();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    date: "",
    material: "",
    dimensions: "",
    classification: "",
    credit: "",
    objectNumber: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      console.error("User not loaded");
      return;
    }

    try {
      await createRecord.mutateAsync({
        ...formData,
        userId: user.id,
      });
      console.log(formData)

      navigate("/");
    } catch (error) {
      console.error("Error creating record:", error);
    }
  };
  
  console.log("Submitting record:", {
  ...formData,
  userId: user?.id,
  collectionId: null,
});
  return <div className='max-w-lg mx-auto'>
    <Link to="/" className='btn btn-ghost btn-sm gap-1 mb-4'>
      <ArrowLeftIcon className='size-4' /> Back
    </Link>

    <div className='card bg-base-300'>
      <div className='card-body'>
        <h1 className='card-title'>
          <SparklesIcon className='size-5 text-primary' />
          New Record
        </h1>

        <form onSubmit={handleSubmit} className='space-y-4 mt-4'>

          {/* TITLE INPUT */}
          <label className='input input-bordered flex items-center gap-2 bg-base-200'>
            <TypeIcon className='size-4 text-base-content/50'/>
            <input
              type="text"
              placeholder='Record title'
              className='grow'
              value={formData.title}
              onChange={(e) => setFormData ({...formData, title: e.target.value })}
              required
              />
          </label>

          {/* IMAGE INPUT */}
          <label className='input input-bordered flex items-center gap-2 bg-base-200'>
            <TypeIcon className='size-4 text-base-content/50'/>
            <input
              type="url"
              placeholder='Image URL'
              className='grow'
              value={formData.imageUrl}
              onChange={(e) => setFormData ({...formData, imageUrl: e.target.value })}
              required
              />
          </label>

          {/* IMAGE PREVIEW */}
          {formData.imageUrl && (
            <div className='rounded-box overflow-hidden'>
              <img
              src={formData.imageUrl}
              alt="Image Preview"
              className='w-full h-40 object-cover'
              onError={(e) => (e.target.style.display = "none")}
              />
            </div>
          )}

          <div className='form-control'>
            <div className='flex items-start gap-2 p-3 rounded-box bg-base-200 border border-base-300'>
              <FileTextIcon className='size-4 text-base-content/50 mt-1'/>
              <textarea 
              placeholder='Description'
              className='grow bg-transparent resize-none focus:outline-none min-h-24'
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value })}
              required
              />
            </div>
          </div>

          {/* DATE (i.e. circa 850 BCE) */}
          <label className='input input-bordered flex items-center gap-2 bg-base-200'>
            <input
              type="text"
              placeholder="e.g. circa 850 BCE or 1200–1250 CE"
              className='grow'
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </label>

          {/* MATERIAL DROP DOWN */}
          <input
            type="text"
            placeholder="Material (e.g. Gold, Bronze)"
            className="input input-bordered w-full bg-base-200"
            value={formData.material}
            onChange={(e) => setFormData({ ...formData, material: e.target.value })}
            required
          />

          {/* DIMENSIONS */}
          <input
            type="text"
            placeholder="Dimensions (e.g. 5cm x 2cm)"
            className="input input-bordered w-full bg-base-200"
            value={formData.dimensions}
            onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
            required
          />

          {/* CLASSIFICATION (coin, medalion, cup) */}
          <select
            className="select select-bordered w-full bg-base-200"
            value={formData.classification}
            onChange={(e) => setFormData({ ...formData, classification: e.target.value })}
            required
          >
            <option value="">Select classification</option>
            <option value="coin">Coin</option>
            <option value="medallion">Medallion</option>
            <option value="cup">Cup</option>
          </select>

          {/* CREDIT (original sources) */}
          <input
            type="text"
            placeholder="Credit (source/origin)"
            className="input input-bordered w-full bg-base-200"
            value={formData.credit}
            onChange={(e) => setFormData({ ...formData, credit: e.target.value })}
            required
          />

          <input
            type="text"
            placeholder="Object Number"
            className="input input-bordered w-full bg-base-200"
            value={formData.objectNumber}
            onChange={(e) => setFormData({ ...formData, objectNumber: e.target.value })}
            required
          />

          {createRecord.isError && (
            <div role='alert' className='alert alert-error alert-sm'>
              <span>Failed to create. Try again.{}</span>
            </div>
          )}

          <button
            type="submit"
            className='btn btn-primary w-full'
            disabled={createRecord.isPending}
          >
            {createRecord.isPending ? (
              <span className='loading loading-spinner' />
            ) : (
              "Create Record"
            )}
          </button>
        </form>
      </div>
    </div>
  </div>
};

export default CreatePage