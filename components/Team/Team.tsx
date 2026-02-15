"use client";
import { Grid } from "@chakra-ui/react";
import { useEffect } from "react";
import { useTeamMembersStore } from "app/states";
import { TeamCard } from "components";
import { TeamMember } from "types/data/team";

export const TeamForAboutUs = () => {
  const [team] = useTeamMembersStore((state) => [state.teamMembers]);
  const { getTeamMembers } = useTeamMembersStore((state) => ({
    getTeamMembers: state.getTeamMembers,
  }));

  useEffect(() => {
    getTeamMembers();
  }, [getTeamMembers]);

  return (
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        md: "repeat(2, 1fr)",
        lg: "repeat(4, 1fr)",
      }}
      gap={{ base: "2em", md: "4em" }}
      px={{ base: "1rem", md: "2rem" }}
      my={12}
    >
      {team
        .filter((teamMember: TeamMember) => teamMember.job !== "Fundadora")
        .map((teamMember: TeamMember, index: number) => (
          <TeamCard
            key={index}
            name={teamMember.name}
            imageUrl={teamMember.imageUrl}
            job={teamMember.job}
          />
        ))}
    </Grid>
  );
};

export const TeamWithNoFounder = () => {
  const [team] = useTeamMembersStore((state) => [state.teamMembers]);
  const { getTeamMembers } = useTeamMembersStore((state) => ({
    getTeamMembers: state.getTeamMembers,
  }));

  useEffect(() => {
    getTeamMembers();
  }, [getTeamMembers]);

  return (
    <Grid
      templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
      gap={{ base: "2em", md: "4em" }}
      px={{ base: "1rem", md: "2rem" }}
      my={12}
    >
      {team.map((teamMember: TeamMember, index: number) => (
        <TeamCard
          key={index}
          name={teamMember.name}
          imageUrl={teamMember.imageUrl}
          job={teamMember.job}
          href={teamMember.href}
        />
      ))}
    </Grid>
  );
};
