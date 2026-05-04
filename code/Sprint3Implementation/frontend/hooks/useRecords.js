import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { createRecord, deleteRecord, getAllRecords, getMyRecords, getRecordById, updateRecord } from "../lib/api"

export const useRecords = () => {
    const result = useQuery({queryKey: ["records"], queryFn:getAllRecords});
    return result;
}

export const useCreateRecord = () => {
    return useMutation({mutationFn:createRecord})
}

export const useRecord = (id) => {
    return useQuery({
        queryKey: ["record", id],
        queryFn: () => getRecordById(id),
        enabled: !!id
    })
}

export const useDeleteRecord = (id) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:deleteRecord,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["myRecords"]})
        }
    });
}

export const useMyRecords = () => {
    return useQuery ({
        queryKey: ["myRecords"],
        queryFn: getMyRecords,
    })
}

export const useUpdateRecord = () => {
    return useMutation({ mutationFn: updateRecord })
}