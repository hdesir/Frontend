import { rootApi } from "../api/rootApi";

export const videosApi = rootApi.injectEndpoints({

    endpoints: (builder) => ({
        fetchvideos: builder.query({
            query: () => '/videos/videos'
        }),


        addvideo: builder.mutation({
            query: (data) => ({
                url: '/videos/create',
                method: 'video',
                body: data
            }),

            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {

                    const { data: createdvideo } = await queryFulfilled;

                    dispatch(
                        rootApi.util.updateQueryData('fetchvideos', undefined, (draft) => {
                            draft?.push(createdvideo);
                        })
                    )

                } catch (error) {
                    console.log(error);
                }
            }
        }),

        fetchSinglevideo: builder.query({
            query: (videoId) => `/videos/${videoId}`,
        }),
    })

})

export const { useFetchvideosQuery, useAddVideoMutation, useFetchSinglevideoQuery } = videosApi