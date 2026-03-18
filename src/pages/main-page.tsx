import { useEffect, useMemo, useRef, useState } from "react";
import CreatePostForm from "../components/create-post-form";
import DeleteModal from "../components/delete-modal";
import EditModal from "../components/edit-modal";
import Header from "../components/header";
import PostCard from "../components/post-card";
import PostFilters from "../components/post-filters";
import Spinner from "../components/spinner";
import { usePosts } from "../hooks/use-posts";
import { useUsername } from "../hooks/use-username";
import type { Post } from "../types";

export default function MainPage() {
  const { username } = useUsername();
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePosts();
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const [postToEdit, setPostToEdit] = useState<Post | null>(null);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const loaderRef = useRef<HTMLDivElement>(null);

  const posts = data?.pages.flatMap((page) => page.results) ?? [];

  const filteredPosts = useMemo(() => {
    let result = posts;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.username.toLowerCase().includes(q),
      );
    }
    if (sortOrder === "oldest") {
      result = [...result].reverse();
    }
    return result;
  }, [posts, search, sortOrder]);

  useEffect(() => {
    if (!loaderRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="min-h-screen bg-[#DDDDDD]">
      <div className="max-w-[800px] mx-auto min-h-screen bg-white">
        <Header />

        <main className="px-6 py-6 flex flex-col gap-6">
          <CreatePostForm username={username} />

          <PostFilters
            search={search}
            onSearchChange={setSearch}
            sortOrder={sortOrder}
            onSortChange={setSortOrder}
          />

          {isLoading && (
            <div className="flex justify-center py-10">
              <Spinner />
            </div>
          )}

          {isError && (
            <p className="text-center text-red-500 py-6">
              Failed to load posts. Try again later.
            </p>
          )}

          {!isLoading && !isError && filteredPosts.length === 0 && (
            <p className="text-center text-[#777777] py-10">
              {search.trim() ? "No posts match your search." : "No posts yet. Be the first to share something!"}
            </p>
          )}

          {filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              currentUsername={username}
              onEdit={setPostToEdit}
              onDelete={setPostToDelete}
            />
          ))}

          <div ref={loaderRef} className="h-4" />

          {isFetchingNextPage && (
            <div className="flex justify-center py-4">
              <Spinner size="sm" />
            </div>
          )}
        </main>
      </div>

      {postToDelete && (
        <DeleteModal
          post={postToDelete}
          onClose={() => setPostToDelete(null)}
        />
      )}

      {postToEdit && (
        <EditModal post={postToEdit} onClose={() => setPostToEdit(null)} />
      )}
    </div>
  );
}
