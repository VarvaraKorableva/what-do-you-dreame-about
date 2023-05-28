import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
/*
export const datesApi = createApi({
    reducerPath: 'datesApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000/'}),
    endpoints: (build) => ({
        getOneFriendImportantDates: build.query({
            query: () => `importantdates/${id}`,

        })
    })
})*/

//getMyDates = () => {
 //   return fetch(`${BASE_URL}/importantdates/myimportantdates`

export const datesApi = createApi({
    reducerPath: 'datesApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000/'}),
    endpoints: (build) => ({
        getMyDates: build.query({
            query: () => `importantdates/myimportantdates`,

        })
    })
});

export const {useGetMyDatesQuery} = datesApi;

