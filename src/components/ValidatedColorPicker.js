import React, {useCallback, useState} from 'react';
import chroma from 'chroma-js';
import ClayForm from '@clayui/form';

import ClayColorPicker from '@clayui/color-picker';

function ValidatedColorPicker(props) {
	const {
		label,
		onColorsChange,
		onValueChange,
		value,
		...otherProps
	} = props;

	const [color, setColor] = useState(value);
	const [error, setError] = useState(false);

	const validatedValueChange = useCallback(
		(val) => {
			try {
				setColor(val);

				chroma(val);

				onValueChange(val);

				setError(false);
			}
			catch(err) {
				console.log(err);

				setError(true);
			}
		},
		[onValueChange]
	);

	return (
		<ClayForm.Group className={error ? 'has-error' : ''}>
			<ClayColorPicker
				label={label}
				onColorsChange={onColorsChange}
				onValueChange={validatedValueChange}
				showHex={true}
				showPalette={false}
				title={label}
				value={color}
				{...otherProps}
			/>

			{error &&
				<ClayForm.FeedbackItem>
					<ClayForm.FeedbackIndicator symbol="exclamation-full"/>
					{"Please input a valid color value."}
				</ClayForm.FeedbackItem>
			}
		</ClayForm.Group>
	)
}

export default ValidatedColorPicker;