import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Caique Roschel</Text>
          <Text color="gray.300" fontSize="small">
            croschel000@gmail.com
          </Text>
        </Box>
      )}
      <Avatar
        size="md"
        name="Caique Roschel"
        src="https://avatars.githubusercontent.com/u/36478774?v=4"
      />
    </Flex>
  );
}
