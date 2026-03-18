import { formatDistanceToNow } from "date-fns";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import type { Post } from "../types";

interface PostCardProps {
  post: Post;
  currentUsername: string;
  onEdit: (post: Post) => void;
  onDelete: (post: Post) => void;
}

export default function PostCard({
  post,
  currentUsername,
  onEdit,
  onDelete,
}: PostCardProps) {
  const isOwner = post.username === currentUsername;
  const timeAgo = formatDistanceToNow(new Date(post.created_datetime), {
    addSuffix: true,
  });

  return (
    <div className="bg-white rounded-2xl border border-[#999999] overflow-hidden mb-6">
      <div className="bg-[#7695EC] px-6 py-5 flex items-center justify-between">
        <span className="text-white font-bold text-[22px]">{post.title}</span>

        {isOwner && (
          <div className="flex items-center gap-4">
            <button
              onClick={() => onDelete(post)}
              className="text-white hover:opacity-70 transition-opacity"
              aria-label="Delete post"
            >
              <FiTrash2 size={20} />
            </button>
            <button
              onClick={() => onEdit(post)}
              className="text-white hover:opacity-70 transition-opacity"
              aria-label="Edit post"
            >
              <FiEdit2 size={20} />
            </button>
          </div>
        )}
      </div>

      <div className="px-6 py-5">
        <div className="flex items-center justify-between mb-3">
          <span className="font-bold text-[#777777]">@{post.username}</span>
          <span className="text-[#777777] text-sm">{timeAgo}</span>
        </div>
        <p className="text-black text-base">{post.content}</p>
      </div>
    </div>
  );
}
