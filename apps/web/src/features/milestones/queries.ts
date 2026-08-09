import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from './api';
import type { Milestone } from '@365-goals/shared';

export const useMilestones = (goalId: string) => {
  return useQuery({
    queryKey: ['milestones', goalId],
    queryFn: () => api.getMilestones(goalId),
    enabled: !!goalId,
  });
};

export const useCreateMilestone = () => {
  const queryClient = useQueryClient();
  return useMutation<Milestone, Error, Partial<Milestone>>({
    mutationFn: api.createMilestone,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['milestones', variables.goalId] });
    },
  });
};

export const useUpdateMilestone = (goalId: string) => {
  const queryClient = useQueryClient();
  return useMutation<Milestone, Error, { id: string } & Partial<Milestone>>({
    mutationFn: api.updateMilestone,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['milestones', goalId] });
    },
  });
};

export const useDeleteMilestone = (goalId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.deleteMilestone,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['milestones', goalId] });
    },
  });
};
