import React, { useEffect, useState } from 'react';

import ClayIcon from '@clayui/icon';

const cogStyles = {
	padding: '12px 1rem',
	position: 'absolute',
	right: 0,
	top: 0,
	zIndex: 1,
}

const sideBarStyles = {
	maxWidth: '100%',
	width: '700px',
	position: 'fixed',
	right: 0,
	top: 0,
	zIndex: 1,
};

function SideBar(props) {
	const {
		children,
		show: initShow,
		title,
	} = props;

	const [show, setShow] = useState(true);

	useEffect(() => {
		setShow(initShow);
	}, [initShow])

	if (show) {
		return (
			<div className="sidebar sidebar-light" style={sideBarStyles}>
				<nav className="component-tbar tbar">
					<div className="container-fluid">
						<ul className="tbar-nav">
							<li className="tbar-item tbar-item-expand">
								<div className="tbar-section">
									<span className="text-truncate-inline">
										<span className="text-truncate">{title}</span>
									</span>
								</div>
							</li>
							<li className="tbar-item">
								<button className="component-action" onClick={() => setShow(false)}>
									<ClayIcon symbol="times" />
								</button>
							</li>
						</ul>
					</div>
				</nav>
				<div className="sidebar-body">
					{children}
				</div>
			</div>
		);
	}
	else {
		return (
			<div style={cogStyles} >
				<button className="component-action" onClick={() => setShow(true)}>
					<ClayIcon symbol="cog" />
				</button>
			</div>
		);
	}
}

export default SideBar;