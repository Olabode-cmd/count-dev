import { useStyleConfig, chakra, forwardRef } from '@chakra-ui/react';
import { CustomCardProps } from '../../theme/theme';
const Card = forwardRef<CustomCardProps, 'div'>((props, ref) => {
	const { size, variant, ...rest } = props;
	const styles = useStyleConfig('Card', { size, variant });

	return <chakra.div ref={ref} __css={styles} {...rest} />;
});

export default Card;
