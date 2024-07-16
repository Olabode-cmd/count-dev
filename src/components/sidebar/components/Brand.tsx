// Chakra imports
import { Flex, useColorModeValue, Image } from '@chakra-ui/react';
// import logo from "/logo-green.png";
import { HSeparator } from '../../separator/Separator';

export function SidebarBrand() {
	return (
		<Flex alignItems='center' flexDirection='column'>
			<Image src="/logo-green.png" w="175px" alt='' />
			<HSeparator mb='20px' mt='10px' />
		</Flex>
	);
}

export default SidebarBrand;
