import React, {useMemo} from 'react';
import './App.css';
import ClayColorPicker from '@clayui/color-picker';
import ClayLayout from '@clayui/layout';
import spritemap from './util/spritemap';
import DownloadJSON from './components/DownloadJSON';
import chroma from 'chroma-js';

import {ClayIconSpriteContext} from '@clayui/icon';

import useLocalStorage from './hooks/useLocalStorage';
import "@clayui/css/lib/css/atlas.css";
import ColorSwatch from './components/ColorSwatch';
import { actionNeutralColors, actionPrimaryColors, actionSecondaryColors } from './util/action-colors';
import SideBar from './components/SideBar';

const BRAND_CSS_VARIABLES = [
	'-darken-5',
	'-darken-4',
	'-darken-3',
	'-darken-2',
	'-darken-1',
	'',
	'-lighten-1',
	'-lighten-2',
	'-lighten-3',
	'-lighten-4',
	'-lighten-5',
	'-lighten-6',
];

function camelCase(str) {
	return str.split('-').reduce((prev, cur, i) => {
		if (i !== 0) {
			cur = cur[0].toUpperCase() + cur.substring(1);
		}

		return prev + cur;
	}, '');
}

function getStateColors(color, state) {
	return [
		{
			cssVariableMapping: `color-state-${state}-darken-2`,
			value: chroma.mix(color, BLACK, .8).hex(),
		},
		{
			cssVariableMapping: `color-state-${state}-darken-1`,
			value: chroma.mix(color, BLACK, .4).hex(),
		},
		{
			cssVariableMapping: `color-state-${state}`,
			value: chroma(color).hex(),
		},
		{
			cssVariableMapping: `color-state-${state}-lighten-1`,
			value: chroma.mix(color, WHITE, .3).hex(),
		},
		{
			cssVariableMapping: `color-state-${state}-lighten-2`,
			value: chroma.mix(color, WHITE, .8).hex(),
		},
	];
}

const PRIMARY = '5924EB';
const SECONDARY = 'FFC124';
const NEUTRAL = '1D1C22';
const INFO = '2E5AAC';
const SUCCESS = '4AAB3B';
const WARNING = 'E06C00';
const ERROR = 'DA1414';
const WHITE = '#FFF';
const BLACK = '#000';

function App() {
	const [customColors, setCustomColors] = useLocalStorage('customColors', [PRIMARY, SECONDARY, NEUTRAL, INFO, SUCCESS, WARNING, ERROR]);

	const [primaryColor, setPrimaryColor] = useLocalStorage('primaryColor', PRIMARY);
	const [primaryColorDarkest, setPrimaryColorDarkest] = useLocalStorage('primaryColorDarkest', '#000');
	const [primaryColorLightest, setPrimaryColorLightest] = useLocalStorage('primaryColorLightest', '#FBFAFF');

	const [secondaryColor, setSecondaryColor] = useLocalStorage('secondaryColor', SECONDARY);
	const [secondaryColorDarkest, setSecondaryColorDarkest] = useLocalStorage('secondaryColorDarkest', '#312300');
	const [secondaryColorLightest, setSecondaryColorLightest] = useLocalStorage('secondaryColorLightest', '#FFFBF0');

	const [neutralColorDarkest, setNeutralColorDarkest] = useLocalStorage('neutralColorDarkest', NEUTRAL);
	const [neutralColorLightest, setNeutralColorLightest] = useLocalStorage('neutralColorLightest', '#FFF');

	const [accentColorsSolid, setAccentColorsSolid] = useLocalStorage('accentColorsSolid', [
		'#EB2453',
		'#A7E204',
		'#C70D95',
		'#221874',
		'#BC24EB',
		'#1CE4B5',
	]);

	const [infoColor, setInfoColor] = useLocalStorage('infoColor', INFO);
	const [successColor, setSuccessColor] = useLocalStorage('successColor', SUCCESS);
	const [warningColor, setWarningColor] = useLocalStorage('warningColor', WARNING);
	const [errorColor, setErrorColor] = useLocalStorage('errorColor', ERROR);

	const primaryColors = useMemo(() => {
		const darkColors = chroma.scale([primaryColorDarkest, primaryColor]).colors(6);

		darkColors.pop();

		const colors = [
			...darkColors,
			...chroma.scale([primaryColor, primaryColorLightest]).colors(7),
		];

		return colors.map((color, i) => ({
			cssVariableMapping: `color-brand-primary${BRAND_CSS_VARIABLES[i]}`,
			value: color,
		}));
	}, [primaryColor, primaryColorDarkest, primaryColorLightest]);

	const secondaryColors = useMemo(() => {
		const darkColors = chroma.scale([secondaryColorDarkest, secondaryColor]).colors(6);

		darkColors.pop();

		const colors = [
			...darkColors,
			...chroma.scale([secondaryColor, secondaryColorLightest]).colors(7),

		];

		return colors.map((color, i) => ({
			cssVariableMapping: `color-brand-secondary${BRAND_CSS_VARIABLES[i]}`,
			value: color,
		}));
	}, [secondaryColor, secondaryColorDarkest, secondaryColorLightest]);

	const neutralColors = useMemo(() => {
		const colors = chroma.scale([neutralColorDarkest, neutralColorLightest]).colors(11);

		return colors.map((color, i) => ({
			cssVariableMapping: `color-neutral-${10 - i}`,
			value: color,
		}));
	}, [neutralColorDarkest, neutralColorLightest]);

	const accentColors = useMemo(() => {
		const accentColors = [];

		accentColorsSolid.forEach((color, i) => {
			accentColors.push({
				cssVariableMapping: `color-accent-${i + 1}`,
				value: color,
			});

			accentColors.push({
				cssVariableMapping: `color-accent-${i + 1}-lighten`,
				value: chroma.mix(color, '#FFF', 0.90).hex(),
			});
		});

		return accentColors;
	}, [accentColorsSolid]);

	const infoColors = useMemo(() => {
		return getStateColors(infoColor, 'info');
	}, [infoColor]);

	const successColors = useMemo(() => {
		return getStateColors(successColor, 'success');
	}, [successColor]);

	const warningColors = useMemo(() => {
		return getStateColors(warningColor, 'warning');
	}, [warningColor]);

	const errorColors = useMemo(() => {
		return getStateColors(errorColor, 'error');
	}, [errorColor]);

	const chartColors = useMemo(() => {
		console.log('compute accent colors');
		const colors = [];

		colors.push({
			cssVariableMapping: 'color-chart-0',
			value: chroma.mix(primaryColor, '#FFF', 0.20).hex(),
		});

		accentColorsSolid.forEach((color, i) => {
			colors.push({
				cssVariableMapping: `color-chart-${i + 1}`,
				value: chroma.mix(color, '#FFF', 0.20).hex(),
			});
		});

		accentColorsSolid.forEach((color, i) => {
			colors.push({
				cssVariableMapping: `color-chart-${i + 7}`,
				value: chroma.mix(color, '#FFF', 0.50).hex(),
			});
		});

		return colors;
	}, [accentColorsSolid, primaryColor]);

	const json = useMemo(() => {
		const json = {};
		console.log('primaryColors', primaryColors);
		primaryColors.forEach(color => {
			json[camelCase(color.cssVariableMapping)] = {...color};
		});

		secondaryColors.forEach(color => {
			json[camelCase(color.cssVariableMapping)] = color;
		});

		neutralColors.forEach(color => {
			json[camelCase(color.cssVariableMapping)] = color;
		});

		accentColors.forEach(color => {
			json[camelCase(color.cssVariableMapping)] = color;
		});

		actionPrimaryColors.forEach(color => {
			json[camelCase(color.cssVariableMapping)] = color;
		});

		actionSecondaryColors.forEach(color => {
			json[camelCase(color.cssVariableMapping)] = color;
		});

		actionNeutralColors.forEach(color => {
			json[camelCase(color.cssVariableMapping)] = color;
		});

		infoColors.forEach(color => {
			json[camelCase(color.cssVariableMapping)] = color;
		});

		successColors.forEach(color => {
			json[camelCase(color.cssVariableMapping)] = color;
		});

		warningColors.forEach(color => {
			json[camelCase(color.cssVariableMapping)] = color;
		});

		errorColors.forEach(color => {
			json[camelCase(color.cssVariableMapping)] = color;
		});

		chartColors.forEach(color => {
			json[camelCase(color.cssVariableMapping)] = color;
		});

		return json;
	}, [primaryColors, secondaryColors, neutralColors, accentColors, infoColors, successColors, warningColors, errorColors, chartColors]);

	return (
		<ClayIconSpriteContext.Provider value={spritemap}>
			<div className="App">
				<h1 className="p-3 card" style={{borderRadius: '0'}}>Dialect Style Book Generator</h1>

				<SideBar show={true} title="Configurations">
					<h2>Set Base Color Values</h2>

					<h2 className="mt-4">Brand</h2>

					<ClayLayout.Row>
						<ClayLayout.Col size={4}>
							<ClayColorPicker
								colors={customColors}
								label="Primary Color Darkest"
								name="primaryColorDarkest"
								onColorsChange={setCustomColors}
								onValueChange={setPrimaryColorDarkest}
								showHex={true}
								title="Primary Color Darkest"
								value={primaryColorDarkest}
							/>
						</ClayLayout.Col>
						<ClayLayout.Col size={4}>
							<ClayColorPicker
								colors={customColors}
								label="Primary Color"
								name="primaryColor"
								onColorsChange={setCustomColors}
								onValueChange={setPrimaryColor}
								showHex={true}
								title="Primary Color"
								value={primaryColor}
							/>
						</ClayLayout.Col>
						<ClayLayout.Col size={4}>
							<ClayColorPicker
								colors={customColors}
								label="Primary Color Lightest"
								name="primaryColorLightest"
								onColorsChange={setCustomColors}
								onValueChange={setPrimaryColorLightest}
								showHex={true}
								title="Primary Color Lightest"
								value={primaryColorLightest}
							/>
						</ClayLayout.Col>
					</ClayLayout.Row>

					<ClayLayout.Row>
						<ClayLayout.Col size={4}>
							<ClayColorPicker
								colors={customColors}
								label="Secondary Color Darkest"
								name="secondaryColorDarkest"
								onColorsChange={setCustomColors}
								onValueChange={setSecondaryColorDarkest}
								showHex={true}
								title="Secondary Color Darkest"
								value={secondaryColorDarkest}
							/>
						</ClayLayout.Col>
						<ClayLayout.Col size={4}>
							<ClayColorPicker
								colors={customColors}
								label="Secondary Color"
								name="secondaryColor"
								onColorsChange={setCustomColors}
								onValueChange={setSecondaryColor}
								showHex={true}
								title="Secondary Color"
								value={secondaryColor}
							/>
						</ClayLayout.Col>
						<ClayLayout.Col size={4}>
							<ClayColorPicker
								colors={customColors}
								label="Secondary Color Lightest"
								name="secondaryColorLightest"
								onColorsChange={setCustomColors}
								onValueChange={setSecondaryColorLightest}
								showHex={true}
								title="Secondary Color Lightest"
								value={secondaryColorLightest}
							/>
						</ClayLayout.Col>
					</ClayLayout.Row>

					<h2 className="mt-4">Neutral</h2>

					<ClayLayout.Row>
						<ClayLayout.Col size={6}>
							<ClayColorPicker
								colors={customColors}
								label="Neutral Color Darkest"
								name="neutralColorDarkest"
								onColorsChange={setCustomColors}
								onValueChange={setNeutralColorDarkest}
								showHex={true}
								title="Neutral Color Darkest"
								value={neutralColorDarkest}
							/>
						</ClayLayout.Col>
						<ClayLayout.Col size={6}>
							<ClayColorPicker
								colors={customColors}
								label="Neutral Color Lightest"
								name="neutralColorLighest"
								onColorsChange={setCustomColors}
								onValueChange={setNeutralColorLightest}
								showHex={true}
								title="Neutral Color Lightest"
								value={neutralColorLightest}
							/>
						</ClayLayout.Col>
					</ClayLayout.Row>

					<h2 className="mt-4">Accent</h2>

					<ClayLayout.Row>
						{Array(6).fill(0).map((_, i) => (
							<ClayLayout.Col key={i} size={4}>
								<ClayColorPicker
									colors={customColors}
									label={`Accent Color ${i + 1}`}
									name={`accentColor${i + 1}`}
									onColorsChange={setCustomColors}
									onValueChange={value => {
										const newAccentColors = [...accentColorsSolid];

										newAccentColors[i] = `#${value}`;

										console.log(newAccentColors);

										setAccentColorsSolid(newAccentColors);
									}}
									showHex={true}
									title={`Accent Color ${i + 1}`}
									value={accentColorsSolid[i]}
								/>
							</ClayLayout.Col>
						))}
					</ClayLayout.Row>

					<h2 className="mt-4">States</h2>

					<ClayLayout.Row>
						<ClayLayout.Col size={3}>
							<ClayColorPicker
								colors={customColors}
								label="Info Color"
								name="infoColor"
								onColorsChange={setCustomColors}
								onValueChange={setInfoColor}
								showHex={true}
								title="Info Color"
								value={infoColor}
							/>
						</ClayLayout.Col>
						<ClayLayout.Col size={3}>
							<ClayColorPicker
								colors={customColors}
								label="Success Color"
								name="successColor"
								onColorsChange={setCustomColors}
								onValueChange={setSuccessColor}
								showHex={true}
								title="Success Color"
								value={successColor}
							/>
						</ClayLayout.Col>
						<ClayLayout.Col size={3}>
							<ClayColorPicker
								colors={customColors}
								label="Warning Color"
								name="warningColor"
								onColorsChange={setCustomColors}
								onValueChange={setWarningColor}
								showHex={true}
								title="Warning Color"
								value={warningColor}
							/>
						</ClayLayout.Col>
						<ClayLayout.Col size={3}>
							<ClayColorPicker
								colors={customColors}
								label="Error Color"
								name="errorColor"
								onColorsChange={setCustomColors}
								onValueChange={setErrorColor}
								showHex={true}
								title="Error Color"
								value={errorColor}
							/>
						</ClayLayout.Col>
					</ClayLayout.Row>

					<ClayLayout.Row>
						<ClayLayout.Col size={12}>
							<DownloadJSON className="mt-4" json={json}></DownloadJSON>
						</ClayLayout.Col>
					</ClayLayout.Row>
				</SideBar>

				<ClayLayout.Container fluid>
					<h2 className="mt-4">Brand</h2>

					<div className="d-flex flex-wrap">
						{primaryColors.map(color => (
							<ColorSwatch color={color} key={color.cssVariableMapping} />
						))}
					</div>

					<div className="d-flex flex-wrap">
						{secondaryColors.map(color => (
							<ColorSwatch color={color} key={color.cssVariableMapping} />
						))}
					</div>

					<h2 className="mt-4">Neutral</h2>

					<div className="d-flex flex-wrap">
						{neutralColors.map(color => (
							<ColorSwatch color={color} key={color.cssVariableMapping} />
						))}
					</div>

					<h2 className="mt-4">Accent</h2>

					<div className="d-flex flex-wrap">
						{accentColors.map(color => (
							<ColorSwatch color={color} key={color.cssVariableMapping} />
						))}
					</div>

					<h2 className="mt-4">States</h2>

					<div className="d-flex flex-wrap">
						{infoColors.map(color => (
							<ColorSwatch color={color} key={color.cssVariableMapping} />
						))}
					</div>

					<div className="d-flex flex-wrap">
						{successColors.map(color => (
							<ColorSwatch color={color} key={color.cssVariableMapping} />
						))}
					</div>

					<div className="d-flex flex-wrap">
						{warningColors.map(color => (
							<ColorSwatch color={color} key={color.cssVariableMapping} />
						))}
					</div>

					<div className="d-flex flex-wrap">
						{errorColors.map(color => (
							<ColorSwatch color={color} key={color.cssVariableMapping} />
						))}
					</div>

					<h2 className="mt-4">Charts</h2>

					<div className="d-flex flex-wrap">
						{chartColors.map(color => (
							<ColorSwatch color={color} key={color.cssVariableMapping} />
						))}
					</div>
				</ClayLayout.Container>
			</div>
		</ClayIconSpriteContext.Provider>
	);
}

export default App;
