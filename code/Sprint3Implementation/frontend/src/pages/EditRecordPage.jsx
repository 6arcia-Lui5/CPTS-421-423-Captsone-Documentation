import { useNavigate, useParams, Link } from "react-router";
import { useAuth } from "@clerk/react";
import { useRecord, useUpdateRecord } from "../../hooks/useRecords";
import LoadingSpinner from "../components/LoadingSpinner";
import EditRecordForm  from "../components/EditRecordForm"

function EditRecordPage() {
  const {id} = useParams();
  const { isLoaded, userId } = useAuth();
  const navigate = useNavigate();

  const { data: record, isLoading } = useRecord(id);
  const updateRecord = useUpdateRecord();

  if (isLoading) return <LoadingSpinner/>

  if (!record || record.userId !== userId) {
    return (
      <div className="card bg-base-300 max-w-md mx-auto">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-error">{!record ? "Not found" : "Access denied"}</h2>
          <Link to="/" className="btn btn-primary btn-sm">
            Go Home
          </Link>
        </div>
      </div>
    );
  }


  return (
    <EditRecordForm
      record={record}
      isPending={updateRecord.isPending}
      isError={updateRecord.isError}
      onSubmit={(formData) => {
        updateRecord.mutate(
          { id, ...formData },
          {
            onSuccess: () => navigate(`/record/${id}`),
          }
        );
      }}
    />
  );
}

export default EditRecordPage;