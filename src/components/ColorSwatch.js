function ColorSwatch({color}) {
	const styles = {
		backgroundColor: color.value,
		height: '3rem',
		width: '3rem',
		borderRadius: '50%',
		boxShadow: '0px 2px 6px 0px #5924EB38',
	};

	const labelStyles = {
		fontSize: '0.5rem',
	};

	return (
		<div className="m-2" style={{width: '8.5rem'}}>
			<div className="color-swatch mb-2" style={styles}></div>

			<div style={labelStyles}>{color.cssVariableMapping}</div>
			<div style={labelStyles}>{color.value}</div>
		</div>
	);
}

export default ColorSwatch;
