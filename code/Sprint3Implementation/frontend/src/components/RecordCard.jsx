import { Link } from "react-router";
import { MessageCircleIcon } from "lucide-react";

const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

const RecordCard = ({ record }) => {
    const isNew = new Date(record.createdAt) > oneWeekAgo;

    return (
        <Link
            to={`/record/${record.id}`}
            className="card bg-base-300 hover:bg-base-200 transition-colors"
            >
                <figure className="px-4 pt-4">
                    <img 
                        src={record.imageUrl} 
                        alt={record.title}
                        className="rounded-xl h-40 w-full object-cover" 
                        />
                </figure>
                <div className="card-body p-4">
                    <h2 className="card-title text-base">
                        {record.title}
                        {isNew && <span className="badge badge-secondary badge-sm">NEW</span>}
                    </h2>
                    <p className="text-sm text-base-content/70 line-clamp-2">{record.description}</p>

                    <div className="divider my-1"></div>

                    <div className="flex items-center justify-between">
                        {record.user && (
                            <div className="flex items-center gap-2">
                                <div className="avatar">
                                    <div className="w-6 rounded-full ring-1 ring-primary">
                                        <img src={record.user.imageUrl} alt={record.user.name} />
                                    </div>
                                </div>
                                <span className="text-xs text-base-content/60">{record.user.name}</span>
                            </div>
                        )}
                        {/* Can add a component for showing number of comments maybe? */}
                    </div>
                </div>
            </Link>
    )
}

export default RecordCard;