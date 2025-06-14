import type { FC } from "react";
import { Heading, Text } from "@chakra-ui/react";
import styled from "styled-components";

import type { TestInput } from "./TestComponent.types";

const TestComponentWrapper = styled.div`
  margin: auto;
  padding: 16px;
  text-align: center;
`;

export const TestComponent: FC<TestInput> = ({ text }) => (
	<TestComponentWrapper data-test-id="test-component">
		<Heading>This website is currently being rebuilt</Heading>
		{text && <Text data-test-id="test-component-text">{text}</Text>}
	</TestComponentWrapper>
);
