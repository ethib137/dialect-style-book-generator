import React from 'react';

import ClayButton from '@clayui/button';
import ClayForm, {ClayInput} from '@clayui/form';

import JSZip from 'jszip';
import {saveAs} from 'file-saver';
import useLocalStorage from '../hooks/useLocalStorage';

function DownloadJSON({className, json}) {
	const [styleBookName, setStyleBookName] = useLocalStorage('styleBookName', 'Dialect');

	return (
		<>
			<ClayForm.Group className={className}>
				<label htmlFor="basicInputText">Style Book Name</label>

				<ClayInput
					onChange={e => setStyleBookName(e.target.value)}
					placeholder="Style Book Name"
					type="text"
					value={styleBookName}
				/>
			</ClayForm.Group>

			<ClayButton block={true} displayType="primary" onClick={() => {
				const zip = new JSZip();

				const zipName = `${styleBookName.split(/\s+/).join('-').toLowerCase()}-style-book`;

				const folder = zip.folder(zipName);

				folder.file('frontend-tokens-values.json', JSON.stringify(json));
				folder.file('style-book.json', JSON.stringify({name: styleBookName, frontendTokensValuesPath: 'frontend-tokens-values.json'}));

				zip.generateAsync({type:"blob"})
				.then(function (blob) {
					saveAs(blob, `${zipName}.zip`);
				});
			}}>Download Style Book</ClayButton>
		</>
	);
}

export default DownloadJSON;
