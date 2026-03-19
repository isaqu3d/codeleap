import { useInfiniteQuery, useMutation, useQueryClient, type InfiniteData } from '@tanstack/react-query'
import { toast } from 'sonner'
import { fetchPosts, createPost, updatePost, deletePost } from '../api/posts'
import type { CreatePostPayload, PaginatedResponse, Post, UpdatePostPayload } from '../types'

const POSTS_KEY = ['posts']

type PostsCache = InfiniteData<PaginatedResponse<Post>, string | undefined>

export function usePosts() {
  return useInfiniteQuery({
    queryKey: POSTS_KEY,
    queryFn: ({ pageParam }) => fetchPosts(pageParam as string | undefined),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.next ?? undefined,
  })
}

export function useCreatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreatePostPayload) => createPost(payload),
    async onMutate(payload) {
      await queryClient.cancelQueries({ queryKey: POSTS_KEY })
      const previous = queryClient.getQueryData<PostsCache>(POSTS_KEY)

      const tempPost: Post = {
        id: Date.now(),
        username: payload.username,
        created_datetime: new Date().toISOString(),
        title: payload.title,
        content: payload.content,
      }

      queryClient.setQueryData<PostsCache>(POSTS_KEY, (old) => {
        if (!old || old.pages.length === 0) return old
        return {
          ...old,
          pages: [
            { ...old.pages[0], results: [tempPost, ...old.pages[0].results] },
            ...old.pages.slice(1),
          ],
        }
      })

      return { previous }
    },
    onError: (_err, _variables, context) => {
      queryClient.setQueryData(POSTS_KEY, context?.previous)
      toast.error('Failed to create post. Please try again.')
    },
    onSuccess: () => toast.success('Post created!'),
    onSettled: () => queryClient.invalidateQueries({ queryKey: POSTS_KEY }),
  })
}

export function useUpdatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdatePostPayload }) =>
      updatePost(id, payload),
    async onMutate({ id, payload }) {
      await queryClient.cancelQueries({ queryKey: POSTS_KEY })
      const previous = queryClient.getQueryData<PostsCache>(POSTS_KEY)

      queryClient.setQueryData<PostsCache>(POSTS_KEY, (old) => {
        if (!old) return old
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            results: page.results.map((p) => (p.id === id ? { ...p, ...payload } : p)),
          })),
        }
      })

      return { previous }
    },
    onError: (_err, _variables, context) => {
      queryClient.setQueryData(POSTS_KEY, context?.previous)
      toast.error('Failed to update post. Please try again.')
    },
    onSuccess: () => toast.success('Post updated!'),
    onSettled: () => queryClient.invalidateQueries({ queryKey: POSTS_KEY }),
  })
}

export function useDeletePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deletePost(id),
    async onMutate(id) {
      await queryClient.cancelQueries({ queryKey: POSTS_KEY })
      const previous = queryClient.getQueryData<PostsCache>(POSTS_KEY)

      queryClient.setQueryData<PostsCache>(POSTS_KEY, (old) => {
        if (!old) return old
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            results: page.results.filter((p) => p.id !== id),
          })),
        }
      })

      return { previous }
    },
    onError: (_err, _variables, context) => {
      queryClient.setQueryData(POSTS_KEY, context?.previous)
      toast.error('Failed to delete post. Please try again.')
    },
    onSuccess: () => toast.success('Post deleted!'),
    onSettled: () => queryClient.invalidateQueries({ queryKey: POSTS_KEY }),
  })
}
