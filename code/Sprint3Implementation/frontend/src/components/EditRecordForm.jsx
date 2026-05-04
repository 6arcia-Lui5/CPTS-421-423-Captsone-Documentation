import { ArrowLeftIcon, ImageIcon, TypeIcon, FileTextIcon, SaveIcon } from "lucide-react";
import { useState } from "react";
import { Form, Link } from "react-router";

function EditRecordForm({record, isPending, isError, onSubmit}) {
    const [formData, setFormData] = useState({
        title: record.title,
        description: record.description,
        imageUrl: record.imageUrl,
    })

    return (
        <div className="max-w-lg mx-auto">
            <Link to="/profile" className="btn btn-ghost btn-sm gap-1 mb-4">
                <ArrowLeftIcon className="size-4" /> Back
            </Link>

            <div className="card bg-base-300">
                <div className="card-body">
                    <h1 className="card-title">
                        <SaveIcon className="size-5 text-primary" />
                        Edit Record
                    </h1>
                    <form onSubmit={(e) => {
                        e.defaultPrevented();
                        onSubmit(formData);
                    }}
                    className="space-y-4 mt-4"
                    >
                        <Label className="input input-bordered flex items-center gap-2 bg-base-200">
                            <TypeIcon className="size-4 text-base-content/50" />
                            <input
                            type="text"
                            placeholder="Record Title"
                            className="grow"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                            />
                        </Label>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditRecordForm