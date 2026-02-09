"use client";
import { Flex, Text, Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { useOldMembersStore } from "app/states";
import { Reveal } from "components";
import { OldMember } from "types/data/team";

const AllPeople = () => {
  const [allMembers] = useOldMembersStore((state) => [state.oldMembers]);
  const { getOldMembers } = useOldMembersStore((state) => ({
    getOldMembers: state.getOldMembers,
  }));

  useEffect(() => {
    getOldMembers();
  }, [getOldMembers]);

  return (
    <Flex
      direction="column"
      px={{ base: "1rem", md: "2rem" }}
      my={12}
      alignItems="flex-start" 
      width="100%"
    >
      {allMembers.map((person: OldMember, index: number) => (
        <Reveal
          key={index}
          animationdirection="bottom"
          delay={0.05 * index}
        >
          <Flex justify="flex-start" alignItems="center" gap="0.5em">
            <Text as="span" fontSize={{ base: "1.2rem", md: "1rem" }} fontWeight="normal">
              {person.name}
            </Text>
            {person.job && (
              <>
                <Text as="span" fontSize={{ base: "0.9rem", md: "1rem" }} fontWeight="normal">
                  -
                </Text>
                <Text as="span" fontSize={{ base: "0.9rem", md: "1rem" }} fontWeight="light" color="gray.600">
                  {person.job}
                </Text>
              </>
            )}
          </Flex>
        </Reveal>
      ))}
    </Flex>
  );
};

export default AllPeople;